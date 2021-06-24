<template>
  <div>
    <div class="form-group">
      <label>Фотографии автомобиля:</label>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="8">
          <v-file-input v-model="uploadedFile" clearable label="Выбрать файл" ref="currentFile" @change="selectFile">
          </v-file-input>
        </v-col>
        <v-col cols="4" class="pl-2">
          <v-btn color="success" dark small @click="upload()">
            Загрузить
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>Список файлов</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <v-list-item-content>
              <a :href="`/api/downloadFile/car/${carId}/${file.name}`">{{ file.name }}</a>
            </v-list-item-content>
            <v-btn :disabled="!!file.isBeingImported" class="mr-5" color="error" medium
                   @click="removeFile(file.name)">
              Удалить
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {FileStorageService} from "@/services/FileUploadService";
import {root} from "@/api";
import ModalDialogService from "@/services/ModalDialogService";
import SnackbarService from "@/services/SnackbarService";
import {FileInfo} from "@/models/FileInfo";

@Component
export default class CarPhotoUploader extends Vue {

  private currentFile: (string | Blob) = '';
  private progress = 0;
  private message = '';
  private fileInfos: FileInfo[] = [];
  private uploadedFile: any = [];

  @Prop()
  private carId!: number;

  created() {
    this.getFiles();
  }

  private selectFile(file: any) {
    this.progress = 0;
    this.currentFile = file;
  }

  private upload() {
    if (!this.currentFile) {
      this.message = "Please select a file!";
      return;
    }
    this.fileUpload(this.currentFile, () => this.getFiles());
    this.currentFile = "";
    this.uploadedFile = [];
    console.log('File was uploaded')
  }

  private fileUpload(fileForUpload: string | Blob, callback: () => void | null) {
    const url = `${root}/fileUpload/car/${this.carId}`;

    FileStorageService.fileUploadToUrl(url, fileForUpload)
        .then(() => {
          this.currentFile = "";
          callback();
        })
        .catch(errors => {
          SnackbarService.showErrorSnackbarAndLog("Произошла непредвиденная ошибка", errors);
        });
  }

  private removeFile(filename: string) {
    ModalDialogService.showModalDialog(`Файл с именем ${filename} будет удалён. Продолжить?`, () => this.acceptRemove(filename));
  }

  private getFiles() {
    const url = `${root}/fileUpload/car/${this.carId}`;
    FileStorageService.getFilesFromUrl(url).then(response => {
      this.fileInfos.splice(0, this.fileInfos.length);
      this.fileInfos.push(...response.data.map(value => {
        value.isBeingImported = false;
        return Vue.observable(value);
      }));
      console.log('File date ' + response.data);
      this.currentFile = '';
    })
        .catch(errors => {
          SnackbarService.showErrorSnackbarAndLog("Произошла непредвиденная ошибка", errors);
        });

    console.log('getFiles() END');
  }


  private acceptRemove(filename: string) {
    console.log('Remove file name -> ' + filename);
    const url = `${root}/fileUpload/car/${this.carId}/${filename}`;

    FileStorageService.removeFileFromUrl(url)
        .then(() => {
          SnackbarService.showSuccessSnackbar('Файл успешно удалён!');
          this.fileInfos = this.fileInfos.filter(element => element.name !== filename);
        })
        .catch(errors => {
          SnackbarService.showErrorSnackbarAndLog('Произошла ошибка при удалении файла', errors);
        });
  }
}
</script>

<style scoped>

</style>
