//Inspiration from https://www.djamware.com/post/5fc19e3e77862f22905c7f03/ionic-5-tutorial-oauth2-login-example-vue

import axios from "axios";
import {store} from "@/store";
import {TokenService} from "@/services/token.service";
import {loadingController} from "@ionic/vue";

const ApiService = {
    _requestInterceptor: 0,
    _401interceptor: 0,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;
    },

    removeHeader() {
        axios.defaults.headers.common = {};
    },

    get(resource) {
        return axios.get(resource);
    },

    post(resource, data) {
        return axios.post(resource, data);
    },

    put(resource, data) {
        return axios.put(resource, data);
    },

    delete(resource) {
        return axios.delete(resource);
    },

    customRequest(data) {
        return axios(data);
    },

    mountRequestInterceptor() {
        //Set interceptor so there is an loading indicator.
        this._requestInterceptor = axios.interceptors.request.use(
            async (config) => {
                const loading = await loadingController.create({
                    showBackdrop: true,
                    message: "Please wait",
                    duration: 125,
                });
                await loading.present();

                return config;
            }
        );
    },

    mount401Interceptor() {
        //Set interceptor so if there is an 401 try to reauthenticate
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.request.status === 401) {
                    if (error.config.url.includes("oauth/token")) {
                        await store.dispatch("auth/signOut");
                        throw error;
                    } else {
                        try {
                            await store.dispatch("auth/refreshToken");
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data,
                            });
                        } catch (e) {
                            throw error;
                        }
                    }
                }
                throw error;
            }
        );
    },

    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    },
};

export {ApiService};
