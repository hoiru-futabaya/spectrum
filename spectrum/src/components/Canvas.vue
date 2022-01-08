<template>
  <div class="canvas">
    Canvas:{{view}}
  </div>
</template>

<script>
import {Live2DCubismFramework as live2dcubismframework, Option as Csm_Option, Csm_CubismFramework as CubismFramework, LogLevel} from '../Framework/src/live2dcubismframework.ts'
import { CubismModelSettingJson } from '../Framework/src/cubismmodelsettingjson.ts'
import { ICubismModelSetting } from '../Framework/src/icubismmodelsetting.ts'
import { CubismUserModel } from '../Framework/src/model/cubismusermodel.ts'
import { CubismModel } from '../Framework/src/model/cubismmodel.ts'
import { LAppPal } from './lapppal.ts'

export default {
  name: 'Canvas',
  props : ['view'],
  data () {
    return {
      path: './src/Resources/futaba',
      _state: null,
      _model: CubismModel()
    }
  },
  methods: {
    setupModel: function (setting) {
      fetch(this.path).then(
        (response) =>
        {
          return response.arrayBuffer()
    }
      ).then(
        (arrayBuffer) =>
        {
          let buffer = arrayBuffer
          // モデルデータを読み込む
          CubismUserModel.loadModel(buffer)
        }
      )
      this._state = 'WaitLoadModel'
    }
  },
  mounted: function () {
    // ログ出力のレベルを設定。LogLevel_Verboseの場合は詳細ログを出力させる。
    this._cubismOption.logFunction = LAppPal.printMessage
    this._cubismOption.loggingLevel = LogLevel.LogLevel_Verbose
    
    // CubismNativeFrameworkの初期化に必要なパラメータを設定する。
    Csm_CubismFramework.startUp(this._cubismOption)
    
    // CubismFrameworkを初期化する。
    Csm_CubismFramework.initialize()

    // モデルファイル取得
    const path = this.path
    fetch(path).then(
      (response) =>
        {
          return response.arrayBuffer()
        }
      ).then(
        (arrayBuffer) =>
          {
            let buffer = arrayBuffer
            let size = buffer.byteLength
            // Jsonに記載されているモデルデータのパスなどを取得する
            let setting =  new CubismModelSettingJson(buffer, size)

            // 結果を保存
            this.setupModel(setting)
            }
      )
  },
  beforeDestroy: function () {
    // モデルデータの破棄
    this._model.release()
    this._model = null
    // CubismFrameworkの破棄
    CubismFramework.dispose()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
