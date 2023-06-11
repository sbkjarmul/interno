<template>
  <div class="d-flex justify-space-between flex-column h-100">
    <div class="w-100 text-start">
      <h1 class="m-0 text-h4">
        <slot name="title"></slot>
      </h1>
    </div>

    <div class="my-5 px-sm-5 py-10 h-100 shadow rounded bg-white">
      <div class="d-flex flex-column flex-sm-row pb-3 px-2 px-sm-0">
        <slot name="topbar"></slot>
      </div>

      <v-divider class="mb-3"></v-divider>

      <slot name="main"></slot>
    </div>

    <div class="w-100">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
