# File Upload Design

## Definition

File upload design explains how clients upload files and how the backend stores, validates, and serves them.

## Why It Matters

Many systems need profile images, documents, reports, or CSV imports. File upload must be secure and reliable.

## Core Example

```text
Client -> API -> File Storage
              -> Database metadata
```

## Common Traps

- Storing large files directly in database.
- Not validating file type and size.
- Trusting file extension only.
- Not scanning risky files.
- No cleanup for failed uploads.

## Interview Answer

For file upload, the backend should validate file size and type, store the file in a file storage system, and save metadata in the database. Large files are usually not stored directly in the database. The API should return file ID or URL after upload.

## Quick Revision

- Validate file size.
- Validate file type.
- Store file in storage system.
- Store metadata in database.
- Do not trust file extension only.
- Secure file access.

## Deep Dive

### Metadata Table

```text
files
- id
- original_name
- storage_path
- content_type
- size
- uploaded_by
- created_at
```

### Employee Task Example

Task may have attachments:

```text
customer document
call recording
report file
```

The task table can reference uploaded file metadata.

### Common Interview Questions

- How do you design file upload?
- Where should files be stored?
- Why not store large files in database?
- What validations are needed?

