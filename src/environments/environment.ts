// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
    recaptchaSiteKey: '6LemTzsUAAAAAIZREwdhx94swTJTZayAB97qVkrW',
    logglyJsKey: '',  // @TODO Get own Loggly
    analyticsId: '',  // @TODO Get own analytics
    firebase: {
        apiKey: 'AIzaSyDbY33snLnE3i52r-vlewHsdMZrmeGN074',
        authDomain: 'kristen-931e3.firebaseapp.com',
        databaseURL: 'https://kristen-931e3.firebaseio.com',
        projectId: 'kristen-931e3',
        storageBucket: 'kristen-931e3.appspot.com',
        messagingSenderId: '675829940622'
    }
};
