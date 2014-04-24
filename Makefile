all: d3.treemap.js

TARGETS= \
	start.js \
	rect.js \
	chunk.js \
	phrase.js \
	layout.js \
	end.js

d3.treemap.js: $(addprefix src/, $(TARGETS))
	cat $^ >$@

%.min.js: %.js
	uglifyjs -o $@ $<
	echo >> $@

clean:
	rm -f d3.treemap.js

.PHONY: clean
