# Troubleshooting 404 Error for Russell Silver Syndrome API

## Issue
Getting 404 error when fetching `/api/russell-silver-syndromes` even though the schema file exists.

## Solutions (try in order):

### 1. Restart Strapi Server
**Most Common Fix**: Strapi needs to be restarted after creating new content types.

1. Stop your Strapi server (Ctrl+C)
2. Restart it: `npm run develop` or `npm run start`
3. Wait for Strapi to fully initialize
4. Try the API call again

### 2. Check API Permissions
Strapi might have API permissions disabled for the new content type.

1. Go to `http://localhost:1337/admin`
2. Navigate to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Find **Russell Silver Syndrome** in the permissions list
4. Check the **find** and **findOne** checkboxes
5. Click **Save**

### 3. Verify Content Type Exists in Admin Panel
1. Go to `http://localhost:1337/admin`
2. Navigate to **Content Manager**
3. Check if "Russell Silver Syndrome" appears in the left sidebar
4. If it doesn't appear, Strapi hasn't recognized the schema yet - restart Strapi

### 4. Check Strapi Logs
Look for any errors in the Strapi terminal output when it starts up. Common issues:
- Schema validation errors
- Component reference errors
- Missing component definitions

### 5. Verify Component References
Make sure all component references in the schema are correct:
- `rss.overview-tab`
- `rss.personal-stories-tab`
- `rss.resources-tab`
- `rss.division-leaders-tab`

All these components should exist in `magic-foundation/src/components/rss/`

### 6. Clear Strapi Cache (if needed)
Sometimes Strapi caches need to be cleared:

1. Stop Strapi
2. Delete `.cache` folder in `magic-foundation/` (if it exists)
3. Restart Strapi

### 7. Check Database
If using SQLite, verify the database has the table:
- Check `magic-foundation/.tmp/data.db` (or your database file)
- The table `russell_silver_syndromes` should exist after Strapi starts

## Quick Test

After restarting Strapi, test the API directly:

```bash
curl http://localhost:1337/api/russell-silver-syndromes
```

Or visit in browser:
```
http://localhost:1337/api/russell-silver-syndromes
```

You should get a JSON response (even if empty array `{"data":[]}`) instead of 404.

## Most Likely Solution

**Restart Strapi** - This fixes 90% of these issues. Strapi needs to scan and register new content types on startup.
