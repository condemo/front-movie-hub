install:
	@yarn build-only
	@sudo cp -r dist/* /var/www/frontmoviehub.com/
