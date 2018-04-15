const seleniumServer = require('selenium-server');
const chromeDriver = require('chromedriver');
const globals = require('./globals');

const SELENIUM_CONFIGURATION = {
  start_process: true,
  server_path: seleniumServer.path,
  log_path: './reports',
  host: '127.0.0.1',
  port: 4444,
  cli_args: {
    'webdriver.chrome.driver': chromeDriver.path,
  },
};

module.exports = {
  src_folders: './tests',
  output_folder: './reports',
  persist_globals: true,
  globals_path: './globals.js',
  selenium: SELENIUM_CONFIGURATION,
  test_workers: false,
  test_settings: {
    default: {
      launch_url: globals.launchUrl,
      selenium_port: 4444,
      selenium_host: 'localhost',
      request_timeout_options: {
        timeout: 15000,
        retry_attempts: 3,
      },
      silent: true,
      screenshots: {
        enabled: true,
        path: './screenshots',
        on_failure: true,
      },

      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: { args: ['window-size=1920,1080', 'disable-gpu'] },
      },
    },
  },
};
