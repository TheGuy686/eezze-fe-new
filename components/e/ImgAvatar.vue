<style lang="less" scoped>
.img-avatar-root {
    position: relative;

    .img-preview {
        border-radius: 50%;
        overflow: hidden;

        img {
            width: auto;
            height: 100%
        }
    }

    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: -2px;
        color: white;
        opacity: 0;

        transition: opacity 0.2s;
    }

    &:hover {
        .overlay {
            background-color: rgba(255, 255, 255, 0.5);
            opacity: 1;
            cursor: pointer;
        }
    }

    .disabled { cursor: default !important; }
}
</style>

<template>
<div
    :class="'img-avatar-root ' + (!canUpload ? 'disabled' : '')"
    @mouseover="active = true"
    @mouseleave="active = false"
    @click="fileUploadClicked"
>
    <e-avatar
        :size="size"
        :isEditable="true"
        :color="color"
        :initials="!initials ? 'na' : initials"
        :imgSrc="imgSrc"
        renderMode="default"
    />

    <input
        ref="avatar-upload"
        style="display: none;"
        type="file"
        accept="image/jpeg, image/png, image/gif"
        @change="doUploadAvatar"
        @submit="doUploadAvatar"
    />

    <div class="overlay" v-if="!isDoingRequest && canUpload">

        <GeneralIcon type="edit-w" />

    </div>

    <div
        class="overlay"
        :style="{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            opacity: isDoingRequest ? 1 : 0
        }"
        v-if="isDoingRequest"
    >

        <a-spin />

    </div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { randDarkColor } from '~/classes/globals';

export default {
    props: {
        size: {
            type: Number,
            defautl: 96,
        },
        initials: {
            type: String,
        },
        color: {
            type: String,
            default: randDarkColor()
        },
        imgUrl: String,
        uploadPath: String,
        dataKey: String,
        success: Function,
        uploadable: Boolean,
    },
    computed: {
        canUpload() {
            if (typeof this.uploadable == 'boolean' && !this.uploadable) return false;
            return !!((this.imgUrl && this.imgUrl != '') || this.uploadable);
        },
        payload() {
            const ext = this.type.replace('image/', '');

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$auth.strategy.token.get()
                },
                fileName: this.fileName,
                type: this.type,
                size: this.fileSize,
                [this.dataKey ? this.dataKey : 'imgBase64']: this.imgBase64,
                ext: ext == 'jpeg' ? 'jpg' : ext,
                projectId: this.currentProject,
            }
        },
        imgSrc() {
            if (this.imgBase64 != '') return this.imgBase64;
            if (!this.imgUrl || this.imgUrl == '') return;
            try {
                let url = `${this.imgUrl}?cdrfgt=${this.imgCounter}`;

                if (!imageExists(url)) return;

                return url;
            }
            catch (e) { return '' }
        }
    },
    data() {
        return {
            active: false,
            imgBase64: '',
            isDoingRequest: false,
            imgCounter: 0,
            fileName: '',
            type: '',
            fileSize: '',
        }
    },
    methods: {
        mouseOver: function(){this.active = !this.active},
        fileUploadClicked() {
            if (!this.canUpload) return;
            this.$refs['avatar-upload'].click();
        },
        async doUploadAvatar() {
            let file = this.$refs['avatar-upload']['files'][0];

            this.imgBase64 = await convertImgToBase64(file);
            this.fileName = file.name;
            this.type = file.type;
            this.fileSize = file.size;

            await this.doUpload();
        },
        async doUpload() {
            let res, self = this;

            this.isDoingRequest = true;

            try {
                res = await this.$axios.put(this.uploadPath, this.payload);

                let successRes;

                if (res?.status > 199 && res?.status < 300) {
                    try {
                        successRes = res?.data;

                        this.$emit('img-upload-success', successRes);
                    }
                    catch (err) {}
                }

                self.$notification.success({
                    placement: 'topRight',
                    message: tr('file-upload-successful'),
                });

                setTimeout(() => {
                    if (typeof this.success == 'function') {
                        this.success(successRes);
                    }

                    this.imgBase64 = '';
                    this.isDoingRequest = false;
                    this.imgCounter++;

                }, 200);
            }
            catch (e) {
                console.log('There was an error uploading avatar. ', e);

                if (e?.response?.data?.error) {
					self.$notification.error(
						JSON.stringify(e?.response?.data?.error, null, 4),
						{ timer: 2 }
					);
				}

				this.isDoingRequest = false;
            }
        }
    }
}
</script>
