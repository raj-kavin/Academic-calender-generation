import axios from "axios";
import Cookies from "js-cookie";

const userModule = {
    state: {
        userData: null
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        async fetchUserData({ commit }) {
            try {
                const res = await axios.post('http://localhost:5000/getUser', {
                    token: Cookies.get('token')
                });
                commit('setUserData', res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }
};

export default userModule;
