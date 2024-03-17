import { Component, ElementRef, ViewChild } from '@angular/core';
declare var videojs: any;

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent {
    @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef;

    options = {
        autoplay: false,
        notSupportedMessage: 'Invalid Video URL',
    };

    videoLink: string = 'https://vjs.zencdn.net/v/oceans.mp4';

    player!: any;
    isPaused: boolean = true;

    constructor() {}

    ngAfterViewInit(): void {
        this.player = videojs(this.videoPlayer.nativeElement, this.options);

        this.player.src({
            src: this.videoLink,
            type: 'video/mp4',
        });

        this.player.on('pause', () => {
            this.isPaused = true;
        });

        this.player.on('play', () => {
            this.isPaused = false;
        });
    }

    playVideo() {
        if (this.player) {
            this.player.play();
        }
    }

    pauseVideo() {
        if (this.player) {
            this.player.pause();
        }
    }

    restartVideo() {
        if (this.player) {
            this.player.currentTime(0);
            this.player.play();
        }
    }

    jumpForward() {
        if (this.player) {
            const currentTime = this.player.currentTime();
            this.player.currentTime(currentTime + 5);
        }
    }
}
