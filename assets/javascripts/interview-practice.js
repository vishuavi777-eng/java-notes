(function () {
  const QUESTIONS = window.INTERVIEW_PRACTICE_QUESTIONS || [];
  const STORAGE_PREFIX = "interview-practice-confidence:";
  const LAST_QUESTION_KEY = "interview-practice:last-question";
  const CONFIDENCE = {
    red: { label: "Red", text: "Weak" },
    yellow: { label: "Yellow", text: "Need revision" },
    green: { label: "Green", text: "Ready" },
  };

  function storageKey(id) {
    return `${STORAGE_PREFIX}${id}`;
  }

  function getConfidence(id) {
    return window.localStorage.getItem(storageKey(id)) || "unanswered";
  }

  function setConfidence(id, value) {
    window.localStorage.setItem(storageKey(id), value);
  }

  function uniqueValues(key) {
    return Array.from(new Set(QUESTIONS.map((item) => item[key]))).sort();
  }

  function optionList(values, defaultLabel) {
    return [`<option value="all">${defaultLabel}</option>`]
      .concat(values.map((value) => `<option value="${value}">${value}</option>`))
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function linkFor(source) {
    if (!source) {
      return "";
    }
    const href = source.endsWith("/") ? `../${source}` : `../${source}/`;
    return `<a class="practice-source-link" href="${href}">Open related notes</a>`;
  }

  function renderList(items) {
    if (!items || items.length === 0) {
      return "";
    }
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function filteredQuestions(state) {
    return QUESTIONS.filter((item) => {
      const confidence = getConfidence(item.id);
      const skillMatch = state.skill === "all" || item.skill === state.skill;
      const topicMatch = state.topic === "all" || item.topic === state.topic;
      const levelMatch = state.level === "all" || item.level === state.level;
      const confidenceMatch =
        state.confidence === "all" ||
        confidence === state.confidence ||
        (state.confidence === "weak" && ["red", "yellow", "unanswered"].includes(confidence));

      return skillMatch && topicMatch && levelMatch && confidenceMatch;
    });
  }

  function statsFor(items) {
    return items.reduce(
      (summary, item) => {
        const confidence = getConfidence(item.id);
        summary[confidence] += 1;
        summary.total += 1;
        return summary;
      },
      { red: 0, yellow: 0, green: 0, unanswered: 0, total: 0 }
    );
  }

  function pickRandom(items, currentId) {
    if (items.length === 0) {
      return null;
    }
    if (items.length === 1) {
      return items[0];
    }
    const available = items.filter((item) => item.id !== currentId);
    return available[Math.floor(Math.random() * available.length)];
  }

  function initInterviewPractice() {
    const root = document.querySelector("#interview-practice-app");
    if (!root || root.dataset.practiceBound) {
      return;
    }

    root.dataset.practiceBound = "true";
    const state = {
      skill: "all",
      topic: "all",
      level: "all",
      confidence: "weak",
      currentId: window.localStorage.getItem(LAST_QUESTION_KEY),
      answerVisible: false,
    };

    function currentQuestion() {
      return QUESTIONS.find((item) => item.id === state.currentId) || null;
    }

    function syncTopicOptions() {
      const topicSelect = root.querySelector("[data-practice-filter='topic']");
      const topics = QUESTIONS
        .filter((item) => state.skill === "all" || item.skill === state.skill)
        .map((item) => item.topic);
      const selected = topicSelect.value;
      topicSelect.innerHTML = optionList(Array.from(new Set(topics)).sort(), "All topics");
      topicSelect.value = topics.includes(selected) ? selected : "all";
      state.topic = topicSelect.value;
    }

    function renderShell() {
      root.innerHTML = `
        <section class="practice-app">
          <div class="practice-toolbar">
            <label>
              <span>Skill</span>
              <select data-practice-filter="skill">${optionList(uniqueValues("skill"), "All skills")}</select>
            </label>
            <label>
              <span>Topic</span>
              <select data-practice-filter="topic">${optionList(uniqueValues("topic"), "All topics")}</select>
            </label>
            <label>
              <span>Level</span>
              <select data-practice-filter="level">${optionList(uniqueValues("level"), "All levels")}</select>
            </label>
            <label>
              <span>Status</span>
              <select data-practice-filter="confidence">
                <option value="weak">Weak only</option>
                <option value="all">All</option>
                <option value="unanswered">Unanswered</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
              </select>
            </label>
          </div>

          <div class="practice-actions">
            <button type="button" class="practice-primary" data-practice-action="random">Random Question</button>
            <button type="button" data-practice-action="answer">Show Answer</button>
            <button type="button" data-practice-action="reset">Reset Filters</button>
          </div>

          <section class="practice-stats" aria-live="polite"></section>
          <section class="practice-card" aria-live="polite"></section>
        </section>
      `;

      root.querySelector("[data-practice-filter='confidence']").value = state.confidence;

      root.querySelectorAll("[data-practice-filter]").forEach((filter) => {
        filter.addEventListener("change", () => {
          state[filter.dataset.practiceFilter] = filter.value;
          if (filter.dataset.practiceFilter === "skill") {
            syncTopicOptions();
          }
          state.answerVisible = false;
          const current = currentQuestion();
          const filtered = filteredQuestions(state);
          if (!current || !filtered.some((item) => item.id === current.id)) {
            const next = pickRandom(filtered, state.currentId);
            state.currentId = next?.id || null;
          }
          render();
        });
      });

      root.querySelector("[data-practice-action='random']").addEventListener("click", () => {
        const next = pickRandom(filteredQuestions(state), state.currentId);
        state.currentId = next?.id || null;
        state.answerVisible = false;
        if (state.currentId) {
          window.localStorage.setItem(LAST_QUESTION_KEY, state.currentId);
        }
        render();
      });

      root.querySelector("[data-practice-action='answer']").addEventListener("click", () => {
        state.answerVisible = !state.answerVisible;
        render();
      });

      root.querySelector("[data-practice-action='reset']").addEventListener("click", () => {
        state.skill = "all";
        state.topic = "all";
        state.level = "all";
        state.confidence = "weak";
        state.answerVisible = false;
        root.querySelector("[data-practice-filter='skill']").value = state.skill;
        syncTopicOptions();
        root.querySelector("[data-practice-filter='level']").value = state.level;
        root.querySelector("[data-practice-filter='confidence']").value = state.confidence;
        render();
      });
    }

    function renderStats() {
      const filtered = filteredQuestions(state);
      const allStats = statsFor(QUESTIONS);
      const filteredStats = statsFor(filtered);
      const readyPercent = allStats.total
        ? Math.round((allStats.green / allStats.total) * 100)
        : 0;

      root.querySelector(".practice-stats").innerHTML = `
        <div class="practice-summary">
          <strong>${filtered.length}</strong>
          <span>questions in current filter</span>
        </div>
        <div class="practice-meter">
          <span>Overall ready: ${readyPercent}%</span>
          <div class="practice-meter__bar"><span style="width: ${readyPercent}%"></span></div>
        </div>
        <div class="practice-stat-grid">
          <span class="practice-pill practice-pill--green">Green ${allStats.green}</span>
          <span class="practice-pill practice-pill--yellow">Yellow ${allStats.yellow}</span>
          <span class="practice-pill practice-pill--red">Red ${allStats.red}</span>
          <span class="practice-pill">Unanswered ${allStats.unanswered}</span>
        </div>
        <p class="practice-muted">Current filter: ${filteredStats.green} green, ${filteredStats.yellow} yellow, ${filteredStats.red} red, ${filteredStats.unanswered} unanswered.</p>
      `;
    }

    function renderQuestion() {
      const card = root.querySelector(".practice-card");
      const question = currentQuestion();
      const filtered = filteredQuestions(state);

      if (!question || filtered.length === 0) {
        card.innerHTML = `
          <div class="practice-empty">
            <strong>No question found for this filter.</strong>
            <p>Change skill, level, topic, or status.</p>
          </div>
        `;
        return;
      }

      const confidence = getConfidence(question.id);
      card.innerHTML = `
        <div class="practice-card__meta">
          <span>${escapeHtml(question.skill)}</span>
          <span>${escapeHtml(question.topic)}</span>
          <span>${escapeHtml(question.level)}</span>
          <span class="practice-confidence practice-confidence--${confidence}">${confidence === "unanswered" ? "Unanswered" : CONFIDENCE[confidence].label}</span>
        </div>
        <h2>${escapeHtml(question.question)}</h2>
        <div class="practice-answer ${state.answerVisible ? "is-visible" : ""}">
          <h3>Simple Answer</h3>
          ${question.answer.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
          <h3>Key Points</h3>
          ${renderList(question.keyPoints)}
          <h3>Possible Follow-ups</h3>
          ${renderList(question.followUps)}
          ${linkFor(question.source)}
        </div>
        <div class="practice-confidence-actions" aria-label="Mark confidence">
          <button type="button" data-confidence="red">Red - Weak</button>
          <button type="button" data-confidence="yellow">Yellow - Revision</button>
          <button type="button" data-confidence="green">Green - Ready</button>
        </div>
      `;

      card.querySelectorAll("[data-confidence]").forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.confidence === getConfidence(question.id)
        );
        button.addEventListener("click", () => {
          setConfidence(question.id, button.dataset.confidence);
          render();
        });
      });

      root.querySelector("[data-practice-action='answer']").textContent = state.answerVisible
        ? "Hide Answer"
        : "Show Answer";
    }

    function render() {
      renderStats();
      renderQuestion();
    }

    renderShell();
    syncTopicOptions();
    if (!currentQuestion()) {
      const first = pickRandom(filteredQuestions(state), null);
      state.currentId = first?.id || null;
    }
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInterviewPractice);
  } else {
    initInterviewPractice();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initInterviewPractice);
  }
})();
