<template>
  <svg v-if="!active" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="M7.7 1c.368 0 .667.299.667.667v8a.667.667 0 01-.667.666H2.367a.667.667 0 01-.667-.666v-8c0-.368.299-.667.667-.667H7.7zm8 0c.368 0 .667.299.667.667v4a.667.667 0 01-.667.666h-5.333a.667.667 0 01-.667-.666v-4c0-.368.299-.667.667-.667H15.7z"
        fill="#A1ABB4"
      />
      <path
        d="M7.7 11.667c.368 0 .667.298.667.666v4A.667.667 0 017.7 17H2.367a.667.667 0 01-.667-.667v-4c0-.368.299-.666.667-.666H7.7zm8-4c.368 0 .667.298.667.666v8A.667.667 0 0115.7 17h-5.333a.667.667 0 01-.667-.667v-8c0-.368.299-.666.667-.666H15.7z"
        fill="#415668"
      />
    </g>
  </svg>

  <svg v-else viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="50%" y1="-124.512%" x2="50%" y2="100%" id="a">
        <stop stop-color="#4AC3F8" offset="0%" />
        <stop stop-color="#2490EF" offset="100%" />
      </linearGradient>
    </defs>
    <g fill-rule="nonzero" transform="translate(-13 -10)" fill="url(#a)">
      <path
        d="M19.7 10c.368 0 .667.299.667.667v8a.667.667 0 01-.667.666h-5.333a.667.667 0 01-.667-.666v-8c0-.368.299-.667.667-.667H19.7zm8 0c.368 0 .667.299.667.667v4a.667.667 0 01-.667.666h-5.333a.667.667 0 01-.667-.666v-4c0-.368.299-.667.667-.667H27.7z"
        opacity=".6"
      />
      <path
        d="M19.7 20.667c.368 0 .667.298.667.666v4A.667.667 0 0119.7 26h-5.333a.667.667 0 01-.667-.667v-4c0-.368.299-.666.667-.666H19.7zm8-4c.368 0 .667.298.667.666v8A.667.667 0 0127.7 26h-5.333a.667.667 0 01-.667-.667v-8c0-.368.299-.666.667-.666H27.7z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    active: {
      default: false
    }
  }
};
</script>
