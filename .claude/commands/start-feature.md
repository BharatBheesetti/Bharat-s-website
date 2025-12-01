# Start Feature Branch

You are helping the user start a new feature branch following git best practices.

## Steps:

1. Check current git status
2. If there are uncommitted changes:
   - Show the changes to the user
   - Ask if they want to:
     - Commit them (provide a suggested commit message)
     - Stash them
     - Discard them (with confirmation)
3. Ask the user for the feature name (suggest a name based on context)
4. Create a new branch: `git checkout -b feature/[name]`
5. Confirm the branch was created successfully
6. Remind the user to:
   - Work on this branch
   - Commit frequently
   - Run tests before merging back to main

## Branch Naming:
- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `content/` - Content updates

## Example:
```bash
git status
git add .
git commit -m "feat: add previous work"
git checkout -b feature/seo-improvements
```
