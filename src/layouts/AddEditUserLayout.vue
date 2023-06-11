<template>
  <div class="d-flex flex-column h-100">
    <div class="w-100 text-start">
      <h1 class="m-0 text-h4">
        <slot name="title"></slot>
      </h1>
    </div>

    <div class="d-flex flex-row h-100 mt-5">
      <div
        class="px-5 pt-10 pb-5 h-50 w-75 d-flex flex-column justify-space-between align-start shadow rounded bg-white"
      >
        <div class="d-flex flex-row pb-3 w-100">
          <div class="w-50 mr-2 d-flex flex-column justify-start align-start">
            <label class="font-weight-bold mb-2 text-subtitle-2 text-dark" for="firstName">
              First Name
            </label>
            <v-text-field
              name="firstName"
              placeholder="Enter name"
              variant="outlined"
              class="w-100"
            >
            </v-text-field>
          </div>
          <div class="w-50 ml-2 d-flex flex-column justify-start align-start">
            <label class="font-weight-bold mb-2 text-subtitle-2 text-dark" for="firstName"
              >Last Name</label
            >
            <v-text-field
              name="lastName"
              placeholder="Enter last name"
              variant="outlined"
              class="w-100"
            ></v-text-field>
          </div>
        </div>

        <div>
          <slot name="action-buttons"></slot>
        </div>
      </div>

      <div
        class="ml-5 px-5 pt-10 pb-5 w-25 h-50 d-flex flex-column justify-space-between shadow rounded bg-white"
      >
        <div>
          <v-avatar
            image="https://static.wikia.nocookie.net/naruto/images/4/4a/Obito_Uchiha.png/revision/latest/scale-to-width-down/699?cb=20161010144227&path-prefix=pl"
            size="100"
            class="border-secondary outline"
          ></v-avatar>
        </div>
        <div class="d-flex flex-row">
          <slot name="change-photo-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Input */
:deep(.v-field__input) {
  --v-field-input-min-height: 30px;
  padding: 4px 14px;
  font-size: 12px;
}

:deep(.v-field__outline) {
  opacity: 0.4;
}

/* Change photo button */
:deep(.v-btn__prepend) {
  font-size: 10px;
  transform: translateY(1px);
  margin-inline-end: 0;
}
</style>
