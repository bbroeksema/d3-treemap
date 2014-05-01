GENERATED_FILES = \
	d3.treemap.js \
	d3.treemap.min.js

UGGLIFY = node_modules/uglify-js/bin/uglifyjs

all: ${GENERATED_FILES}

TARGETS= \
	start.js \
	rect.js \
	chunk.js \
	phrase.js \
	layout.js \
	end.js

d3.treemap.js: $(addprefix src/, $(TARGETS))
	cat $^ > $@

d3.treemap.min.js: d3.treemap.js ${UGGLIFY}
	${UGGLIFY} -o $@ $<
	echo >> $@

clean:
	rm -f ${GENERATED_FILES}


.PHONY: clean
