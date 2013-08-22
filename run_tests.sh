#!/bin/bash

bundle exec rake spec
karma start public/test/config/karma.config.js --single-run