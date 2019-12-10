<template>
    <div id="app">
        <ChartView v-if="viewChart"
                   :ticker="viewChart"
                   @close-chart="viewChart = null" />
        <Help v-if="viewHelp" @close-help="viewHelp = null" />
        <FlowContainer v-if="auth"
                       @help="viewHelp = true"
                       @chart="viewChart = $event" />
        <div v-if="loading" style="margin-top:100px">Please wait...</div>
        <div v-if="opra" style="  margin-top: 100px;">
            <h1 style="color: #05c46b;">
                Looking for Free Options Flow?
            </h1>
            <p>
                <strong>It's still available for free</strong>, but we've been asked by
                the OPRA to ensure every user consents to their data use agreement.
            </p>
            <p style="font-weight: bold;font-size: 1.25em;">
                You can acccess this tool for free at:
            </p>
            <p>
                <a href="https://www.aidedtrade.com/"
                   style="font-size: 1.5em;color: #05c46b;text-decoration: none;font-weight: bold;">
                    https://www.aidedtrade.com
                </a>
            </p>
            <p>
                NOTE: You will still be able to use the options flow even with a free or
                expired account.
            </p>
        </div>
    </div>
</template>

<script>
    import FlowContainer from "./components/FlowContainer.vue";
    import ChartView from "./components/ChartView.vue";
    import Help from "./components/Help.vue";

    export default {
        name: "app",
        components: {
            FlowContainer,
            ChartView,
            Help
        },
        data: function () {
            return {
                viewChart: null,
                viewHelp: null,
                auth: false,
                opra: false,
                loading: true
            };
        },
        mounted: function () {
            let params = new URL(document.location).searchParams;
            let userid = params.get("userid");
            let token = params.get("token");
            let url = `https://aidedtrade.com/aidedTrade_app/super-api.php?func=checkauth&userid=${encodeURIComponent(
                userid
            )}&token=${encodeURIComponent(token)}`;
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.status == "success") {
                        this.loading = false;
                        this.auth = true;
                    } else {
                        this.loading = false;
                        this.opra = true;
                    }
                })
                .catch(error => {
                    this.loading = false;
                    this.opra = true;
                });
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2d3436;
    }

    input,
    button {
        height: 24px;
    }

    input {
        border: none;
        padding: 0 1em;
    }

    .hidden {
        display: none;
    }

    .btn {
        font-size: 12px;
        border: none;
        padding: 0 1em;
        cursor: pointer;
    }

        .btn.river {
            background: #636e72;
            color: #dfe6e9;
        }

            .btn.river:hover {
                background: #6c5ce7;
            }

            .btn.river.active {
                background: #a29bfe;
                color: #2d3436;
            }
</style>
