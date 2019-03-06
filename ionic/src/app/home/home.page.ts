import { Component } from '@angular/core';
import { watsonToneAnalyzer } from './watsonToneAnalyzer.service'
import { ToastController,LoadingController } from '@ionic/angular';
import { WatsonMessage } from './watson.messages';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private textValue: string;
  private message: string;
  private loading;

  constructor(
    private WatsonToneAnalyzer: watsonToneAnalyzer,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.textValue = '';
    this.message = '';
    this.WatsonToneAnalyzer.initWatson();
  }

  callWatson() {
    if (this.textValue) {
      this.presentLoadingWithOptions();
      this.WatsonToneAnalyzer.analyzeToneOnGivenText(this.textValue).subscribe((data) => {
        console.log(data);
        this.processResultJson(data);
      }, (error) => {
        console.log(error)
        this.removeLoadingWithOptions();
      })
    }
  }

  processResultJson(data) {

    if (data.document_tone.tones.length > 0) {

      let tones = data.document_tone.tones;
      var emotionValue;
      var emotionId;
      var emotionScore = 0;
      tones.forEach(tone => {

        let score = tone.score * 100;
        if (emotionScore < score) {
          emotionScore = score;
          emotionValue = tone.tone_name;
          emotionId = tone.tone_id;
        }
      });
      this.fetchAlert(emotionValue,emotionId,emotionScore);
    } else {
      this.removeLoadingWithOptions();
    }
  }

  fetchAlert(emotionValue, emotionId, emotionScore) {

    var message = "";

    switch (emotionId) {
      case 'anger':
        message = WatsonMessage.toneMessage.anger.message
        break;
      case 'fear':
        message = WatsonMessage.toneMessage.fear.message
        break;
      case 'joy':
        message = WatsonMessage.toneMessage.joy.message
        break;
      case 'sadness':
        message = WatsonMessage.toneMessage.sadness.message
        break;
      case 'analytical':
        message = WatsonMessage.toneMessage.analytical.message
        break;
      case 'confident':
        message = WatsonMessage.toneMessage.confident.message
        break;
      case 'tentative':
        message = WatsonMessage.toneMessage.tentative.message
        break;
    }

    this.message = `Message is : ${message}. The category is ${emotionValue} with a score of ${emotionScore}`;
    this.removeLoadingWithOptions();
    this.presentToastWithOptions();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }
  removeLoadingWithOptions() {
    this.loading.dismiss();
  }
}

