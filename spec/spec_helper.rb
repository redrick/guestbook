
# require 'ruby-debug'

  ENV["RAILS_ENV"] = 'test'
  require File.expand_path("../../config/environment", __FILE__)
  require 'rspec/rails'

  # Requires supporting ruby files with custom matchers and macros, etc,
  # in spec/support/ and its subdirectories.
  Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

  #we don't want to log everything since that takes a lot of I/O time
  Rails.logger.level = 4


  RSpec.configure do |config|
    # add devise test helpers to our specs
    config.include Devise::TestHelpers, :type => :controller
    # config.include RspecAttributesAccessible
    # config.mock_with :mocha
    # config.mock_with :flexmock
    # config.mock_with :rr
    config.mock_with :rspec

    # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
    config.fixture_path = "#{::Rails.root}/spec/fixtures"

    # If you're not using ActiveRecord, or you'd prefer not to run each of your
    # examples within a transaction, remove the following line or assign false
    # instead of true.
    #config.use_transactional_fixtures = true
    config.before(:suite) do

    end

    config.before(:suite) do
    end

    config.before(:each) do

    end

    config.after(:each) do

    end
  end
