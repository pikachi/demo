/**声音管理器 */
export default class AudioManager {

    effectId: number = null;

    musicId: number = null;

    /**音效音量 */
    effectVolume: number = 1;
    /**音效音量 */
    bgVolume: number = 1;

    /**背景音乐开关 */
    musicSwith = null

    /**音效开关 */
    effectSwith = null;


    constructor() {
        this.getSaveData();
    }

    /**
     * 播放背景音乐
     * @param music 音乐
     * @param isLoop 是否循环
     */
    playBgMusic(music: cc.AudioClip, isLoop: boolean = true) {
        this.musicId = cc.audioEngine.playMusic(music, isLoop);
        return this.musicId;
    }

    /**
     * 播放音效
     * @param effect 音效 
     * @param loop 
     */
    playEffect(effect: cc.AudioClip, loop: boolean = false): number {
        this.effectId = cc.audioEngine.playEffect(effect, loop);
        return this.effectId;
    }

    /**停止背景音乐 */
    stopBgMusic() {
        cc.audioEngine.stopMusic();
    }

    /**停止音效 */
    stopEffect() {
        cc.audioEngine.stopEffect(this.musicId);
    }

    /**停止所有音效 */
    stopAllEffect() {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 设置音效音量
     * @param volume 范围(0~1) 
     */
    setEffectVolume(volume: number) {
        if (volume <= 0) {
            volume = 0
        } else if (volume >= 1) {
            volume = 1;
        }
        cc.audioEngine.setEffectsVolume(volume);
    }

    /**
     * 设置背景音量
     * @param volume 范围(0~1)
     */
    setBgMusicVolume(volume: number) {
        cc.audioEngine.setMusicVolume(volume);
    }

    /**获取音效音量 */
    getEffectVolume() {
        return cc.audioEngine.getEffectsVolume();
    }

    /**获取背景音乐音量 */
    getBgMusicVolume() {
        return cc.audioEngine.getEffectsVolume();
    }

    /**获得存储数据 */
    getSaveData() {
        let effect = sanka.util.getData("effectVolume");
        this.setEffectVolume(effect ? effect : 1);
        let music = sanka.util.getData("musicVolume");
        this.setBgMusicVolume(music ? music : 1);
    }
} 