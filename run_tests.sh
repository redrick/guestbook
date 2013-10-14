#!/bin/bash

bundle exec rake spec
sudo karma start public/test/config/karma.config.js --single-run