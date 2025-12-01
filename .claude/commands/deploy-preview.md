# Deploy Preview

You are helping the user create a Firebase preview deployment before going live.

## Steps:

1. Check that all changes are committed
2. Run: `firebase hosting:channel:deploy preview`
3. Display the preview URL to the user
4. Remind them to:
   - Test the preview URL
   - Check for any issues
   - Verify SEO tags are working
   - Test on mobile and desktop
5. Ask if they want to deploy to production after testing

## Production Deployment:
If the user approves after testing:
```bash
firebase deploy --only hosting:bharatbheesetti-28996
```

## Rollback (if needed):
```bash
firebase hosting:rollback
```
