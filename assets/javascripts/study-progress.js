(function () {
  const STORAGE_PREFIX = "study-progress:";
  const PAGE_COMPLETE_PREFIX = "study-page-complete:";
  const CONTENT_ROOTS = [
    "/java/",
    "/spring/",
    "/rest-api/",
    "/sql-mysql/",
    "/dsa/",
    "/java-coding-problems/",
    "/backend-system-design/",
    "/interview-preparation/",
    "/behavioral-interview/",
  ];
  const TRACKER_PAGES = [
    { label: "Java", href: "java-progress/" },
    { label: "Spring Boot", href: "spring-boot-progress/" },
    { label: "REST API", href: "rest-api-progress/" },
    { label: "SQL / MySQL", href: "sql-mysql-progress/" },
    { label: "DSA", href: "dsa-progress/" },
    { label: "Java Coding Problems", href: "java-coding-problems-progress/" },
    { label: "Backend System Design", href: "backend-system-design-progress/" },
    { label: "Interview Answers", href: "interview-answers-progress/" },
  ];

  function pathFromUrl(url) {
    const path = url.pathname;
    if (path.endsWith("/index.html")) {
      return path.replace(/index\.html$/, "");
    }
    if (path.endsWith("/")) {
      return path;
    }

    const lastSegment = path.split("/").pop() || "";
    if (lastSegment.includes(".")) {
      return path;
    }

    return `${path}/`;
  }

  function currentPath() {
    return pathFromUrl(window.location);
  }

  function baseUrlForRelativeLinks(baseUrl) {
    const url = new URL(baseUrl || window.location.href);
    const lastSegment = url.pathname.split("/").pop() || "";

    if (!url.pathname.endsWith("/") && !lastSegment.includes(".")) {
      url.pathname = `${url.pathname}/`;
    }

    return url.href;
  }

  function keyFor(path, index, label) {
    return `${STORAGE_PREFIX}${path}:${index}:${label}`;
  }

  function pageCompleteKeyForPath(path) {
    return `${PAGE_COMPLETE_PREFIX}${path}`;
  }

  function pagePathAliases(path) {
    const aliases = new Set([path]);
    if (path.endsWith("/")) {
      aliases.add(`${path}index.html`);
    } else if (path.endsWith("/index.html")) {
      aliases.add(path.replace(/index\.html$/, ""));
    }

    CONTENT_ROOTS.forEach((root) => {
      const rootIndex = path.indexOf(root);
      if (rootIndex > 0) {
        const contentPath = path.slice(rootIndex);
        aliases.add(contentPath);
        if (contentPath.endsWith("/")) {
          aliases.add(`${contentPath}index.html`);
        } else if (contentPath.endsWith("/index.html")) {
          aliases.add(contentPath.replace(/index\.html$/, ""));
        }
      }
    });

    return Array.from(aliases);
  }

  function storedPageCompleteForPath(path) {
    for (const alias of pagePathAliases(path)) {
      const value = window.localStorage.getItem(pageCompleteKeyForPath(alias));
      if (value !== null) {
        return value;
      }
    }

    const aliases = pagePathAliases(path);
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key || !key.startsWith(PAGE_COMPLETE_PREFIX)) {
        continue;
      }

      const storedPath = key.slice(PAGE_COMPLETE_PREFIX.length);
      const storedAliases = pagePathAliases(storedPath);
      const hasSamePath = aliases.some((alias) => storedAliases.includes(alias));
      if (hasSamePath) {
        return window.localStorage.getItem(key);
      }
    }

    return null;
  }

  function isPageCompleteForPath(path) {
    return storedPageCompleteForPath(path) === "true";
  }

  function setPageCompleteForPath(path, value) {
    pagePathAliases(path).forEach((alias) => {
      window.localStorage.setItem(pageCompleteKeyForPath(alias), String(value));
    });
  }

  function labelFor(checkbox) {
    return checkbox.closest("li")?.textContent?.trim() || "";
  }

  function checkboxInfo(checkbox, index) {
    const linkedPagePath = linkedPagePathForCheckbox(checkbox);
    if (linkedPagePath) {
      return {
        key: pageCompleteKeyForPath(linkedPagePath),
        linkedPagePath,
      };
    }
    return {
      key: keyFor(currentPath(), index, labelFor(checkbox)),
      linkedPagePath: null,
    };
  }

  function linkedPagePathForCheckbox(checkbox, baseUrl) {
    const link = checkbox.closest("li")?.querySelector("a[href]");
    if (!link) {
      return null;
    }

    const href = baseUrl ? link.getAttribute("href") : link.href || link.getAttribute("href");
    if (!href || href.startsWith("#")) {
      return null;
    }

    const url = new URL(href, baseUrlForRelativeLinks(baseUrl));
    if (
      ["http:", "https:"].includes(url.protocol) &&
      url.origin !== window.location.origin
    ) {
      return null;
    }

    return pathFromUrl(url);
  }

  function isPageComplete() {
    return isPageCompleteForPath(currentPath());
  }

  function setPageComplete(value) {
    setPageCompleteForPath(currentPath(), value);
  }

  function percent(done, total) {
    if (!total) {
      return 0;
    }
    return Math.round((done / total) * 100);
  }

  function countCheckboxes(checkboxes) {
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter((box) => box.checked).length;
    return { done, total, percent: percent(done, total) };
  }

  function setCheckboxState(checkbox, checked) {
    checkbox.checked = checked;
    checkbox.toggleAttribute("checked", checked);
    checkbox.setAttribute("aria-checked", String(checked));
  }

  function makeProgressBar(value) {
    const bar = document.createElement("div");
    bar.className = "study-progress-bar";
    bar.innerHTML = `<span style="width: ${value}%"></span>`;
    return bar;
  }

  function upsertPagePanel(summary) {
    const article = document.querySelector(".md-content__inner");
    const firstHeading = article?.querySelector("h1");
    if (!article || !firstHeading || summary.total === 0) {
      document.querySelector(".study-progress-panel")?.remove();
      return;
    }

    let panel = article.querySelector(".study-progress-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.className = "study-progress-panel";
      firstHeading.insertAdjacentElement("afterend", panel);
    }

    const completeClass = summary.done === summary.total ? " is-complete" : "";
    panel.className = `study-progress-panel${completeClass}`;
    panel.innerHTML = `
      <div class="study-progress-panel__header">
        <strong>Study Progress</strong>
        <span>${summary.done}/${summary.total} complete (${summary.percent}%)</span>
      </div>
    `;
    panel.appendChild(makeProgressBar(summary.percent));
  }

  function upsertPageCompleteButton() {
    const article = document.querySelector(".md-content__inner");
    const firstHeading = article?.querySelector("h1");
    const shouldHide =
      document.body.dataset.mdPageComplete === "false" ||
      document.body.dataset.hidePageComplete === "true" ||
      document.querySelector("[data-hide-page-complete='true']") ||
      currentPath().includes("/study-tracker/");
    if (!article || !firstHeading || shouldHide) {
      article?.querySelector(".study-page-complete-panel")?.remove();
      return;
    }

    let panel = article.querySelector(".study-page-complete-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.className = "study-page-complete-panel";
      firstHeading.insertAdjacentElement("afterend", panel);
    }

    const completed = isPageComplete();
    panel.classList.toggle("is-complete", completed);
    panel.innerHTML = `
      <div>
        <strong>${completed ? "✓ Page completed" : "Page not completed"}</strong>
        <p>${completed ? "You marked this topic as finished." : "Mark this after you can explain this topic without reading."}</p>
      </div>
      <button type="button" class="study-page-complete-button">
        ${completed ? "Mark incomplete" : "Mark page complete"}
      </button>
    `;

    const button = panel.querySelector("button");
    button.addEventListener("click", () => {
      setPageComplete(!isPageComplete());
      upsertPageCompleteButton();
      updateNavigationPageStatus();
    });
  }

  function updateListStyles(checkboxes) {
    checkboxes.forEach((checkbox) => {
      const item = checkbox.closest("li");
      if (!item) {
        return;
      }
      item.classList.toggle("study-task-complete", checkbox.checked);
    });
  }

  function clearSectionBadges() {
    document
      .querySelectorAll(".study-section-status")
      .forEach((badge) => badge.remove());
  }

  function updateSectionBadges() {
    clearSectionBadges();

    const article = document.querySelector(".md-content__inner");
    if (!article) {
      return;
    }

    const headings = Array.from(article.querySelectorAll("h2"));
    headings.forEach((heading) => {
      const boxes = [];
      let node = heading.nextElementSibling;

      while (node && node.tagName !== "H2") {
        boxes.push(...node.querySelectorAll?.("input[type='checkbox']"));
        node = node.nextElementSibling;
      }

      if (!boxes.length) {
        return;
      }

      const summary = countCheckboxes(boxes);
      const badge = document.createElement("span");
      badge.className = "study-section-status";
      badge.textContent =
        summary.done === summary.total
          ? `✓ ${summary.percent}%`
          : `${summary.percent}%`;
      badge.title = `${summary.done}/${summary.total} complete`;
      heading.appendChild(badge);
      heading.classList.toggle("study-section-complete", summary.done === summary.total);
    });
  }

  function refreshPageProgress() {
    const checkboxes = document.querySelectorAll(
      ".md-content input[type='checkbox']"
    );
    const summary = countCheckboxes(checkboxes);

    updateListStyles(checkboxes);
    updateSectionBadges();
    upsertPagePanel(summary);
    upsertPageCompleteButton();
    updateNavigationPageStatus();
  }

  function updateNavigationPageStatus() {
    const activeLinks = document.querySelectorAll(
      ".md-nav__link--active, .md-tabs__link--active"
    );

    activeLinks.forEach((link) => {
      link.classList.toggle("study-page-nav-complete", isPageComplete());
    });
  }

  function enableCheckboxes() {
    const checkboxes = document.querySelectorAll(
      ".md-content input[type='checkbox']"
    );

    checkboxes.forEach((checkbox, index) => {
      const info = checkboxInfo(checkbox, index);
      const key = info.key;
      const savedValue = info.linkedPagePath
        ? storedPageCompleteForPath(info.linkedPagePath)
        : window.localStorage.getItem(key);
      checkbox.dataset.studyProgressKey = key;

      checkbox.disabled = false;
      checkbox.removeAttribute("disabled");
      checkbox.style.cursor = "pointer";

      const item = checkbox.closest("li");
      if (item) {
        item.style.cursor = "pointer";
      }

      if (savedValue !== null) {
        setCheckboxState(checkbox, savedValue === "true");
      }

      if (!checkbox.dataset.studyProgressBound) {
        checkbox.dataset.studyProgressBound = "true";
        checkbox.addEventListener("change", () => {
          const latestInfo = checkboxInfo(checkbox, index);
          if (latestInfo.linkedPagePath) {
            setPageCompleteForPath(latestInfo.linkedPagePath, checkbox.checked);
          } else {
            window.localStorage.setItem(latestInfo.key, String(checkbox.checked));
          }
          document
            .querySelectorAll(`input[data-study-progress-key="${CSS.escape(latestInfo.key)}"]`)
            .forEach((relatedCheckbox) => {
              setCheckboxState(relatedCheckbox, checkbox.checked);
            });
          refreshPageProgress();
          renderTrackerDashboard();
        });
      }
    });

    refreshPageProgress();
  }

  function parseRemoteCheckboxes(html, path, pageUrl) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll(".md-content input[type='checkbox']")).map(
      (checkbox, index) => {
        const linkedPagePath = linkedPagePathForCheckbox(checkbox, pageUrl);
        if (linkedPagePath) {
          return isPageCompleteForPath(linkedPagePath);
        }

        const label = checkbox.closest("li")?.textContent?.trim() || "";
        const savedValue = window.localStorage.getItem(keyFor(path, index, label));
        return savedValue === "true";
      }
    );
  }

  async function trackerSummary(page) {
    const url = new URL(page.href, window.location.href);
    const path = pathFromUrl(url);
    const response = await fetch(url.pathname);
    const html = await response.text();
    const completed = parseRemoteCheckboxes(html, path, url.href);
    const total = completed.length;
    const done = completed.filter(Boolean).length;

    return {
      ...page,
      done,
      total,
      percent: percent(done, total),
      url: url.pathname,
    };
  }

  function isTrackerOverview() {
    return /\/study-tracker\/(?:index\.html)?$/.test(window.location.pathname);
  }

  async function renderTrackerDashboard() {
    if (!isTrackerOverview()) {
      return;
    }

    const article = document.querySelector(".md-content__inner");
    const firstHeading = article?.querySelector("h1");
    if (!article || !firstHeading) {
      return;
    }

    let dashboard = article.querySelector(".study-dashboard");
    if (!dashboard) {
      dashboard = document.createElement("section");
      dashboard.className = "study-dashboard";
      firstHeading.insertAdjacentElement("afterend", dashboard);
    }

    dashboard.innerHTML = "<p>Loading progress...</p>";

    try {
      const summaries = await Promise.all(TRACKER_PAGES.map(trackerSummary));
      const total = summaries.reduce((sum, item) => sum + item.total, 0);
      const done = summaries.reduce((sum, item) => sum + item.done, 0);
      const totalPercent = percent(done, total);

      dashboard.innerHTML = `
        <div class="study-dashboard__summary">
          <strong>Total Progress</strong>
          <span>${done}/${total} complete (${totalPercent}%)</span>
        </div>
      `;
      dashboard.appendChild(makeProgressBar(totalPercent));

      const grid = document.createElement("div");
      grid.className = "study-dashboard__grid";

      summaries.forEach((item) => {
        const card = document.createElement("a");
        card.className =
          item.done === item.total && item.total > 0
            ? "study-dashboard-card is-complete"
            : "study-dashboard-card";
        card.href = item.url;
        card.innerHTML = `
          <span class="study-dashboard-card__title">${item.label}</span>
          <span class="study-dashboard-card__value">
            ${item.done}/${item.total} (${item.percent}%)
          </span>
        `;
        card.appendChild(makeProgressBar(item.percent));
        grid.appendChild(card);
      });

      dashboard.appendChild(grid);
    } catch (error) {
      dashboard.innerHTML =
        "<p>Progress dashboard could not load. Page-level tracking still works.</p>";
    }
  }

  function initStudyProgress() {
    enableCheckboxes();
    upsertPageCompleteButton();
    updateNavigationPageStatus();
    renderTrackerDashboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStudyProgress);
  } else {
    initStudyProgress();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initStudyProgress);
  }
})();
