process.exit(process.env.VERCEL_GIT_COMMIT_REF.startsWith('vercel') ? 1 : 0)