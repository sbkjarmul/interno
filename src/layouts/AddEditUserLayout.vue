<template>
  <div class="d-flex flex-column h-100">
    <div class="w-100 text-start">
      <h1 class="m-0 text-h4">
        <slot name="title"></slot>
      </h1>
    </div>

    <div class="d-flex flex-column flex-sm-row h-50 mt-5">
      <div
        class="px-5 pt-10 pb-5 h-100 w-sm-60 d-flex flex-column justify-space-between align-start shadow rounded bg-white"
      >
        <div class="d-flex flex-md-row flex-column pb-3 w-100">
          <slot name="text-fields"></slot>
        </div>

        <div>
          <slot name="action-buttons"></slot>
        </div>
      </div>

      <div
        class="ml-0 ml-sm-5 mt-5 mt-sm-0 px-5 pt-10 pb-5 w-sm-40 h-100 d-flex flex-column justify-space-between shadow rounded bg-white"
      >
        <div>
          <slot name="avatar"></slot>
        </div>
        <div class="d-flex flex-row">
          <slot name="change-photo-button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
