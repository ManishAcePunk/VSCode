var AppInsights;
(function () {
    'use strict';

    AppInsights = {
        insightsData: {},

        setInstrumentationKey: function (instrumentationKey) {
            try {
                var sdkInstance = "appInsightsSDK"; window[sdkInstance] = "appInsights"; var aiName = window[sdkInstance], aisdk = window[aiName] || function (e) { function n(e) { t[e] = function () { var n = arguments; t.queue.push(function () { t[e].apply(t, n) }) } } var t = { config: e }; t.initialize = !0; var i = document, a = window; setTimeout(function () { var n = i.createElement("script"); n.src = e.url || "https://az416426.vo.msecnd.net/scripts/b/ai.2.min.js", i.getElementsByTagName("script")[0].parentNode.appendChild(n) }); try { t.cookie = i.cookie } catch (e) { } t.queue = [], t.version = 2; for (var r = ["Event", "PageView", "Exception", "Trace", "DependencyData", "Metric", "PageViewPerformance"]; r.length;) n("track" + r.pop()); n("startTrackPage"), n("stopTrackPage"); var s = "Track" + r[0]; if (n("start" + s), n("stop" + s), n("setAuthenticatedUserContext"), n("clearAuthenticatedUserContext"), n("flush"), !(!0 === e.disableExceptionTracking || e.extensionConfig && e.extensionConfig.ApplicationInsightsAnalytics && !0 === e.extensionConfig.ApplicationInsightsAnalytics.disableExceptionTracking)) { n("_" + (r = "onerror")); var o = a[r]; a[r] = function (e, n, i, a, s) { var c = o && o(e, n, i, a, s); return !0 !== c && t["_" + r]({ message: e, url: n, lineNumber: i, columnNumber: a, error: s }), c }, e.autoExceptionInstrumented = !0 } return t }(
                {
                    instrumentationKey: instrumentationKey
                }); window[aiName] = aisdk, aisdk.queue && 0 === aisdk.queue.length && aisdk.trackPageView({});
            }
            catch (ex) {
                console.log(ex);
            }
        },

        logInAppInsights: function (report, eventName) {
            let timeRendered;
            let timeLoaded;
            let groupId = 'My Workspace';
            try {
                report.on('loaded', function (r) {
                    timeLoaded = Math.round(performance.now() / 1000);
                    // Report.off removes a given event handler if it exists.
                    report.off('loaded');
                });
                report.on('rendered', function (r) {
                    timeRendered = Math.round(performance.now() / 1000);
                    if (report.config.groupId) {
                        groupId = report.config.groupId;
                    }
                    AppInsights.addToLogData('Div Id', report.element.id);
                    AppInsights.addToLogData('WorkspaceId', groupId);
                    AppInsights.addToLogData('ReportId', report.config.id);
                    AppInsights.addToLogData('LoadTime', timeLoaded.toString());
                    AppInsights.addToLogData('RenderedTime', (timeRendered - timeLoaded).toString());                   

                    appInsights.trackEvent({
                        name: eventName,
                        properties: AppInsights.insightsData
                    });

                    report.off('rendered');
                });
            }
            catch (ex) {
                console.log(ex);
            }

        },

        addToLogData: function (property, value) {
            AppInsights.insightsData[property] = value;
        }
    }
})(AppInsights);
