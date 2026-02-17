# Repository Cleanup Plan
**Date:** 2026-02-17  
**Status:** ✅ COMPLETED — See [CLEANUP_SUMMARY.md](CLEANUP_SUMMARY.md) for results

## 🎯 Objective
Clean up the SecureKern repository to have a single source of truth with no legacy/duplicate files, consistent documentation, and working configuration.

---

## 📋 Issues Identified

### 1. Documentation Files (Root & docs/)

| File | Status | Action |
|------|--------|--------|
| `SINGLE_SOURCE_OF_TRUTH.md` | ❌ Completely outdated (mentions `Website/` as build output, worktrees) | **DELETE** |
| `docs/COMPREHENSIVE_AUDIT.md` | ❌ Historical audit with outdated issues | **DELETE** |
| `docs/BLOCKERS.md` | ❌ Old blockers, outdated | **DELETE** |
| `CMS_INTEGRATION_GUIDE.md` | ⚠️ References `.json` instead of `.cjs`, wrong media_folder | **UPDATE** |
| `STRATEGY.md` | ⚠️ Minor updates needed | **UPDATE** |
| `LEITFADEN.md` | ✅ Up to date | KEEP |
| `docs/AUDIT_LOG.md` | ✅ Append-only log | KEEP |
| `README.md` | ✅ Already updated | KEEP |

### 2. Duplicate Service Pages (Root Level)

These pages exist at root AND in `/services/` subdirectory — root versions should be removed:

| Legacy File (ROOT) | Proper File (Services) | Action |
|-------------------|----------------------|--------|
| `site/pages/segmentation.md` | `site/pages/services/segmentation.md` | **DELETE** |
| `site/pages/iec-62443.md` | `site/pages/services/iec-62443.md` | **DELETE** |
| `site/pages/nis2-readiness.md` | `site/pages/services/nis2-readiness.md` | **DELETE** |
| `site/pages/ot-mdr.md` | `site/pages/services/ot-mdr.md` | **DELETE** |
| `site/pages/risk-training.md` | Should be `site/pages/services/ot-risk.md` or `/services/training.md` | **MOVE TO services/** |

### 3. Redirect Pages (Optional - Keep for SEO)

| File | Purpose | Action |
|------|---------|--------|
| `site/pages/iec-62443-beratung.md` | Redirect to `/services/iec-62443.html` | **KEEP** (backwards compat) |
| `site/pages/nis2-beratung.md` | Redirect to `/services/nis2-readiness.html` | **KEEP** (backwards compat) |

### 4. Asset Issues

| File | Issue | Action |
|------|-------|--------|
| `site/assets/images/favicons/README.md` | Being processed as HTML page → `/assets/images/favicons/README/index.html` | **DELETE** or add to `.eleventyignore` |

### 5. Configuration Files

| File | Issue | Action |
|------|-------|--------|
| `package.json` | References non-existent `scripts/fix-encoding.mjs` and `scripts/migrate-pages-to-cms.mjs` | **REMOVE** scripts |
| `site/admin/config.yml` | References `site/_data/navigation.json` and `site/_data/site.json` (don't exist, should be `.cjs`) | **UPDATE** or create JSON mirrors |
| `site/admin/config.yml` | `media_folder: "dist/..."` (dist is generated, should be `site/assets/images/uploads`) | **UPDATE** |

---

## 🔧 Actions to Execute

### Phase 1: Remove Legacy Documentation
- [x] ✅ Delete `SINGLE_SOURCE_OF_TRUTH.md`
- [x] ✅ Delete `docs/COMPREHENSIVE_AUDIT.md`
- [x] ✅ Delete `docs/BLOCKERS.md`

### Phase 2: Remove Duplicate Service Pages
- [x] ✅ Delete `site/pages/segmentation.md`
- [x] ✅ Delete `site/pages/iec-62443.md`
- [x] ✅ Delete `site/pages/nis2-readiness.md`
- [x] ✅ Delete `site/pages/ot-mdr.md`
- [x] ✅ Move `site/pages/risk-training.md` → `site/pages/services/risk-training.md` (updated permalink)

### Phase 3: Fix Assets
- [x] ✅ Delete `site/assets/images/favicons/README.md`

### Phase 4: Update Config Files
- [x] ✅ Remove unused scripts from `package.json` (`fix:encoding`, `migrate:pages`)
- [x] ✅ Update `CMS_INTEGRATION_GUIDE.md` (fix `.json` references, update media_folder docs)
- [x] ✅ Update `site/admin/config.yml`:
  - Fixed `media_folder` to `site/assets/images/uploads`
  - Removed CMS settings section (Navigation/Site are code-managed)
  - Added documentation note

### Phase 5: Final Validation
- [x] ✅ Run `npm run clean`
- [x] ✅ Run `npm run build` — zero errors ✅
- [x] ✅ Verify generated `dist/` has no unwanted files (138 files, down from 143)
- [x] ✅ Verify no 404s or broken internal links

---

## ✅ Expected Outcome

After cleanup:
- ✅ Single source of truth (no duplicate service pages)
- ✅ All docs consistent and up to date
- ✅ No legacy/outdated files
- ✅ Config files reference actual existing files
- ✅ Clean build with no errors
- ✅ No unnecessary files in output

---

## 📝 Notes

1. **Redirect pages** (iec-62443-beratung, nis2-beratung) kept for backwards compatibility / SEO.
2. **CMS settings** (`navigation.json`, `site.json`) need decision:
   - Option A: Create JSON mirrors that sync with `.cjs`
   - Option B: Point CMS to different editable files
   - Option C: Document that Navigation/Site settings are code-only (manual edit)
   - **Recommendation:** Option C for now (simplest, most maintainable)
3. **risk-training.md** should be moved to `/services/` for consistency.

---

**This plan ensures the repository is production-ready with zero legacy debt.**
