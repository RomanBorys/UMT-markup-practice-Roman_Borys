# File Organizer CLI

## Installation

```bash
npm install
npm install commander
Usage
Scan directory
node file-organizer.js scan <directory>
Find duplicates
node file-organizer.js duplicates <directory>
Organize files
node file-organizer.js organize <source> --output <target>
Cleanup old files (dry run)
node file-organizer.js cleanup <directory> --older-than 90
Cleanup with delete
node file-organizer.js cleanup <directory> --older-than 90 --confirm
Project structure
file-organizer/
├── file-organizer.js
├── package.json
├── README.md
└── lib/
    ├── scanner.js
    ├── duplicates.js
    ├── organizer.js
    └── cleanup.js