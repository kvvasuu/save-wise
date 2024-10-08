const notifications = {
  state() {
    return {
      visible: false,
      notificationMessage: "",
      notificationType: true, //true = confirm, false = reject
    };
  },
  getters: {
    getNotificationState(state) {
      return {
        state: state.visible,
        message: state.notificationMessage,
        type: state.notificationType,
      };
    },
  },
  mutations: {
    showNotification(state, payload) {
      state.visible = true;
      state.notificationMessage = payload.message;
      if (payload.type === undefined) state.notificationType = true;
      else state.notificationType = payload.type;
    },
    hideNotification(state) {
      state.visible = false;
      state.notificationMessage = "";
      state.notificationType = true;
    },
  },
  actions: {
    showNotification(context, payload) {
      context.commit("showNotification", {
        message: payload.message,
        type: payload.type,
      });
      setTimeout(() => {
        context.commit("hideNotification");
      }, 3000);
    },
  },
};

export { notifications };
