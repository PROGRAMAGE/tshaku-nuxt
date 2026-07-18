<template>
  <div class="modal fade show" id="post-modal" tabindex="-1" aria-labelledby="post-modalLabel" aria-modal="true" role="dialog" style="display: block;">
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="post-modalLabel">Edit page banner</h5>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="ri-close-fill"></i></button>
        </div>
        <div class="modal-body" id="app_modal_body">
          <form class="form" action="" id="" method="POST" enctype="multipart/form-data">
            <div class="form-group"><label>Banner File<span style="cursor:pointer;" title="this field is mendatory"> (*) </span></label><input type="file" name="banner_profile"></div>
            <input type="hidden" id="ajax_response_field"><button type="submit" class="btn btn-default">Edit Banner</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
