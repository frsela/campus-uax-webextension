
uax-campus.zip:
	@cd src && zip -r -FS ../uax-campus.zip *

clean:
	@rm -f uax-campus.zip

build: clean uax-campus.zip