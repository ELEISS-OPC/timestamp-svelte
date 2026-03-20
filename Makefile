# Runs the development environment
# 	Usage: make dev
.PHONY: dev
dev:
	@npm run dev -- --host 0.0.0.0

# Bump version
# 	Usage: make patch | minor | major
#   This will bump the version in package.json 
#	and create a git commit with the appropriate message
# 	and tag.
.PHONY: patch minor major
patch:
	@npm version patch --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (patch): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

minor:
	@npm version minor --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (minor): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

major:
	@npm version major --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (major): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

# Push tag to origin and trigger a release
.PHONY: release
release:
	@VERSION=$$(node -p "require('./package.json').version") && \
	git push origin $$VERSION
