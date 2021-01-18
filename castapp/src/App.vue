<template>
  <div id="gnize-pictures">
    <h1>Hello World of pain!</h1>
    <p>app id: {{ app_id }}</p>

    <cast-media-player></cast-media-player>
  </div>
</template>

<script>
const context = window.cast.framework.CastReceiverContext.getInstance();

const playerManager = context.getPlayerManager();

const playbackConfig = new window.cast.framework.PlaybackConfig();

playbackConfig.manifestRequestHandler = (requestInfo) => {
  requestInfo.withCredentials = true;
};
playbackConfig.segmentRequestHandler = (requestInfo) => {
  console.log('YEEEEE');
  requestInfo.withCredentials = true;
};
playbackConfig.licenseRequestHandler = (requestInfo) => {
  requestInfo.withCredentials = true;
};

playerManager.setMessageInterceptor(window.cast.framework.messages.MessageType.LOAD, (request) => {
  // Set cookies here.
  // No need to pass cookies into header in each segment.

  //  console.log("content id:", request.media.contentId);
  //  Set your segment valid hls format : below is example:
  //  Refer other format:
  //  https://developers.google.com/cast/docs/reference/caf_receiver/cast.framework.messages#.HlsSegmentFormat

  // request.media.hlsSegmentFormat = cast.framework.messages.HlsSegmentFormat.TS;

  console.log(request);

  return request;
});

context.start({ playbackConfig });

// const LOG_RECEIVER_TAG = 'Receiver';

/**
 * Debug Logger
 */
// const castDebugLogger = window.cast.debug.CastDebugLogger.getInstance();

/**
 * WARNING: Make sure to turn off debug logger for production release as it
 * may expose details of your app.
 * Uncomment below line to enable debug logger and show a 'DEBUG MODE' tag at
 * top left corner.
 */
// castDebugLogger.setEnabled(true);

/**
 * Uncomment below line to show debug overlay.
 */
// castDebugLogger.showDebugLogs(true);

/**
 * Set verbosity level for Core events.
 */
// castDebugLogger.loggerLevelByEvents = {
//   'cast.framework.events.category.CORE': window.cast.framework.LoggerLevel.INFO,
//   'cast.framework.events.EventType.MEDIA_STATUS': window.cast.framework.LoggerLevel.DEBUG,
// };

// if (!castDebugLogger.loggerLevelByTags) {
//   castDebugLogger.loggerLevelByTags = {};
// }

/**
 * Set verbosity level for custom tag.
 * Enables log messages for error, warn, info and debug.
 */
// castDebugLogger.loggerLevelByTags[LOG_RECEIVER_TAG] = window.cast.framework.LoggerLevel.DEBUG;

// playerManager.addEventListener(window.cast.framework.events.EventType.ERROR, (event) => {
//   castDebugLogger.error(LOG_RECEIVER_TAG, `Detailed Error Code - ${event.detailedErrorCode}`);
//   if (event && event.detailedErrorCode === 905) {
//     castDebugLogger.error(
//       LOG_RECEIVER_TAG,
//       'LOAD_FAILED: Verify the load request is set up properly and the media is able to play.',
//     );
//   }
// });

// playerManager.setMessageInterceptor(
//   window.cast.framework.messages.MessageType.SESSION_STATE,
//   (sessionState) => {
//     // Override sessionState.loadRequestData if needed.
//     // const newCredentials = updateCredentials _ (sessionState.loadRequestData.credentials);
//     // sessionState.loadRequestData.credentials = newCredentials;

//     console.log(sessionState.loadRequestData);
//     console.log(sessionState.loadRequestData.credentials);

//     // Add custom data if needed.
//     // eslint-disable-next-line no-param-reassign
//     sessionState.loadRequestData.customData = {
//       membership: 'PREMIUM',
//     };

//     return sessionState;
//   },
// );

// const playbackConfig = new window.cast.framework.PlaybackConfig();
// playbackConfig.manifestRequestHandler = (requestInfo) => {
//   // eslint-disable-next-line no-param-reassign
//   requestInfo.withCredentials = true;
// };

// const castOptions = new window.cast.framework.CastReceiverOptions();

// const playbackConfig = Object.assign(
//   new window.cast.framework.PlaybackConfig(),
//   playerManager.getPlaybackConfig(),
// );

// playbackConfig.manifestRequestHandler = (requestInfo) => {
//   // eslint-disable-next-line no-param-reassign
//   requestInfo.withCredentials = true;
//   requestInfo.headers.Authorization =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodXViQGduaXplLm5sIiwiaWF0IjoxNjEwMjMwOTE1LCJleHAiOjE2MTU0MTQ5MTV9.lrwfJkDILtkbKFoFTCYxDLrx2tVpF7dg85iNN7epu5k';
// };

// playbackConfig.segmentRequestHandler = (requestInfo) => {
//   // eslint-disable-next-line no-param-reassign
//   requestInfo.withCredentials = true;
// };

// playbackConfig.licenseRequestHandler = (requestInfo) => {
//   // eslint-disable-next-line no-param-reassign
//   requestInfo.withCredentials = true;
//   // eslint-disable-next-line no-param-reassign
//   requestInfo.headers.Authorization =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodXViQGduaXplLm5sIiwiaWF0IjoxNjEwMjMwOTE1LCJleHAiOjE2MTU0MTQ5MTV9.lrwfJkDILtkbKFoFTCYxDLrx2tVpF7dg85iNN7epu5k';
// };

// playerManager.setMediaPlaybackInfoHandler((loadRequestData, localPlaybackConfig) => {
//   localPlaybackConfig.manifestRequestHandler = (requestInfo) => {
//     requestInfo.withCredentials = true;
//     console.log('yeehaa');
//     requestInfo.headers.Authorization = 'Bearer XXXXXXXX';
//     return requestInfo;
//   };

//   return localPlaybackConfig;
// });

// castOptions.playbackConfig = playbackConfig;

// context.start(castOptions);

// context.start();

export default {
  name: 'App',

  data() {
    return {
      rootPath: '/',
    };
  },
  components: {},
  methods: {},
  mounted() {
    // if (process.env.NODE_ENV === 'development') {
    //   const cafReceiverLoggerScript = document.createElement('script');
    //   cafReceiverLoggerScript.setAttribute(
    //     'src',
    //     '//www.gstatic.com/cast/sdk/libs/devtools/debug_layer/caf_receiver_logger.js',
    //   );
    //   document.head.appendChild(cafReceiverLoggerScript);
    // }
  },
  computed: {
    app_id() {
      return process.env.VUE_APP_CAST_APP_ID;
    },
  },
};
</script>

<style>
body.modal-open {
  overflow: hidden;
}

body {
  background-color: rgba(0, 0, 0, 1);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-container {
  text-align: center;
}
</style>
