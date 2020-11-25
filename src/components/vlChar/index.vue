<template>
  <div class="vs_char" v-loading="loading">
    <div class="vs_char_list">
      <!--<div class="vs_char_user">
				<div class="vs_char_user_img">
					<img :src="(('myInfo' in dataList) && ('avatar' in dataList.myInfo) && dataList.myInfo.avatar !== '' && dataList.myInfo.avatar !== null && dataList.myInfo.avatar !== undefined)?dataList.myInfo.avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" alt=""></div>
				<div class="vs_char_user_name">{{ (('myInfo' in dataList) && ('nick' in dataList.myInfo) && dataList.myInfo.nick !== '' && dataList.myInfo.nick !== null && dataList.myInfo.nick !== undefined)?dataList.myInfo.nick:'' }}</div>
			</div>-->
      <el-scrollbar style="height: 100%; width: 255px">
        <ul class="vs_char_user_list_wraper">
          <li
            v-for="(item, index) in dataList.sessions"
            :key="index"
            @click="switchUserDialogue(item)"
          >
            <div
              :class="{
                vs_char_user_list: true,
                vs_char_user_list_bgc: 'showBgc' in item && item.showBgc,
              }"
              v-if="'sessions' in dataList && item.scene !== 'team'"
            >
              <div class="vs_char_user_list_img">
                <img
                  :src="
                    'avatar' in item &&
                    item.avatar !== '' &&
                    item.avatar !== null &&
                    item.avatar !== undefined
                      ? item.avatar
                      : avatar
                  "
                  alt=""
                />
              </div>
              <div>
                <div class="vs_char_user_name">
                  {{
                    "nick" in item &&
                    item.nick !== "" &&
                    item.nick !== null &&
                    item.nick !== undefined
                      ? item.nick
                      : "未知好友"
                  }}
                </div>
                <div class="vs_char_user_lastMsg">
                  {{
                    "lastMsg" in item &&
                    "text" in item.lastMsg &&
                    item.lastMsg.text !== "" &&
                    item.lastMsg.text !== null &&
                    item.lastMsg.text !== undefined
                      ? item.lastMsg.text
                      : ""
                  }}
                </div>
              </div>
              <div class="vs_char_user_list_dot" v-if="item.unread != 0">
                <div class="vs_char_user_time_num">
                  {{ item.updateTimeHour }}
                </div>
                <div class="vs_char_user_unread">
                  {{ item.unread }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="vs_char_wrap">
      <div v-if="toAccount === ''" class=""></div>
      <div v-else>
        <!--<div class="vs_char_top">
					<div class="vs_char_top_to">
						<div class="vs_char_top_to_img">
							<img :src="(toUserImg !== '' && toUserImg !== null && toUserImg !== undefined)?toUserImg:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" alt="">
						</div>
						<div class="vs_char_top_to_name">{{ (toUserName !== '' && toUserName !== null && toUserName !== undefined)?toUserName:'未知好友' }}</div>
					</div>
					<div>
						<div class="vs_char_top_more"></div>
					</div>
				</div>-->
        <div class="vs_char_view" id="vs_char_view" v-loading="loading1">
          <div v-for="(item, index) in sessionsList" :key="index">
            <div class="vs_char_view_time" v-if="'printTime' in item">
              {{ item.printTime }}
            </div>
            <div v-if="item.type == 'text'">
              <div
                class="vs_char_view_info_wraper"
                v-if="item.from !== dataList.myInfo.account"
              >
                <div class="vs_char_view_user_info_avatar">
                  <img
                    :src="
                      'avatar' in item &&
                      item.avatar !== '' &&
                      item.avatar !== null &&
                      item.avatar !== undefined
                        ? item.avatar
                        : avatar
                    "
                    alt=""
                  />
                </div>
                <p class="vs_char_view_user_info_text">{{ item.text }}</p>
              </div>
              <div
                class="vs_char_view_info_wraper vs_char_view_info_wraper_right"
                v-else
              >
                <p
                  class="vs_char_view_user_info_text vs_char_view_user_info_text_right"
                >
                  {{ item.text }}
                </p>
                <div
                  class="vs_char_view_user_info_avatar vs_char_view_user_info_avatar_right"
                >
                  <img
                    :src="
                      'myInfo' in dataList &&
                      'avatar' in dataList.myInfo &&
                      dataList.myInfo.avatar !== '' &&
                      dataList.myInfo.avatar !== null &&
                      dataList.myInfo.avatar !== undefined
                        ? dataList.myInfo.avatar
                        : avatar
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div v-if="item.type == 'image'">
              <div
                class="vs_char_view_info_wraper"
                v-if="item.from !== dataList.myInfo.account"
              >
                <div class="vs_char_view_user_info_avatar">
                  <img
                    :src="
                      'avatar' in item &&
                      item.avatar !== '' &&
                      item.avatar !== null &&
                      item.avatar !== undefined
                        ? item.avatar
                        : avatar
                    "
                    alt=""
                  />
                </div>
                <div class="vs_char_view_user_info_img">
                  <!--<img :src="item.file.url" alt="" />-->
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item.file.url"
                    :preview-src-list="[item.file.url]"
                  >
                  </el-image>
                </div>
              </div>
              <div
                class="vs_char_view_info_wraper vs_char_view_info_wraper_right"
                v-else
              >
                <div
                  class="vs_char_view_user_info_img vs_char_view_user_info_img_right"
                >
                  <!--<img :src="item.file.url" alt="" />-->
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item.file.url"
                    :preview-src-list="[item.file.url]"
                  >
                  </el-image>
                </div>
                <div
                  class="vs_char_view_user_info_avatar vs_char_view_user_info_avatar_right"
                >
                  <img
                    :src="
                      'myInfo' in dataList &&
                      'avatar' in dataList.myInfo &&
                      dataList.myInfo.avatar !== '' &&
                      dataList.myInfo.avatar !== null &&
                      dataList.myInfo.avatar !== undefined
                        ? dataList.myInfo.avatar
                        : avatar
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vs_char_enter">
          <div class="vs_char_enter_wraper">
            <div class="vs_char_enter_list">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                alt=""
              /><input
                type="file"
                @change="readLocalFile"
                id="uploadFile"
                title="图片"
              />
            </div>
          </div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model.trim="text"
            resize="none"
            style="height: 80px"
          >
          </el-input>
          <el-button
            class="vs_char_btn"
            type="success"
            size="medium"
            @click="send"
            >发送</el-button
          >
          <div class="vs_char_err" v-if="showErrMsg">{{ errMsg }}</div>
        </div>
      </div>
    </div>
    <div class="login_error" v-if="loginError">
      <div class="login_error_info" @click="init">连接断开，重新连接</div>
    </div>
  </div>
</template>

<script>
import NIM from "./NIM_Web_NIM_v8.1.0.js"; // 修改为你的路径
export default {
  name: "vlChar",
  props: {
    appKey: {
      type: String,
      default: "",
      required: true,
    },
    account: {
      type: String,
      default: "",
      required: true,
    },
    token: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      loading1: false,
      avatar: require("@/assets/common/avatar.png"),
      loginError: false,
      dataList: {}, // 初始化信息
      sessionsList: [], // 聊天信息
      scene: "p2p", // 聊天模式 单聊模式p2p
      text: "", // 发送的文字信息
      toUserImg: "",
      toUserName: "",
      toAccount: "", // 给发送的人id
      errMsg: "", // 不能为空消息
      showErrMsg: false, // 发送错误信息模板
      nim: {}, // 网银云信初始化实例
    };
  },
  watch: {
    appKey: function (val) {
      if (this.appKey === "" || this.account === "" || this.token === "") {
        return;
      }
      this.init();
    },
    account: function (val) {
      if (this.appKey === "" || this.account === "" || this.token === "") {
        return;
      }
      this.init();
    },
    token: function (val) {
      if (this.appKey === "" || this.account === "" || this.token === "") {
        return;
      }
      this.init();
    },
  },
  created() {
    var _self = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13 && _self.toAccount !== "") {
        _self.send();
      }
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    let that = this;
    this.$nextTick(function () {
      if (that.toAccount !== "") {
        var msg_end = document.getElementById("vs_char_view");
        // msg_end.scrollTop = msg_end.scrollHeight+100;
        msg_end.scrollTop = msg_end.scrollHeight;
      }
    });
  },
  methods: {
    formatTime(m) {
      let time = new Date(m);
      var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
      var minute =
        time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      let now = hour + ":" + minute;
      return now;
    },
    readLocalFile() {
      var localFile = document.getElementById("uploadFile").files[0];
      this.nim.sendFile({
        scene: this.scene,
        to: this.toAccount,
        type: "image",
        fileInput: uploadFile,
        uploadprogress: function (obj) {
          console.log("文件总大小: " + obj.total + "bytes");
          console.log("已经上传的大小: " + obj.loaded + "bytes");
          console.log("上传进度: " + obj.percentage);
          console.log("上传进度文本: " + obj.percentageText);
        },
        uploaddone: function (error, file) {
          console.log("上传" + (!error ? "成功" : "失败"), error, file);
        },
        beforesend: function (msg) {
          console.log("正在发送p2p image消息, id=" + msg.idClient);
          // pushMsg(msg);
        },
        done: this.sendMsgDone,
      });
    },
    sendMsgDone(error, msg) {
      console.log(1);
      this.sessionsList.push(msg);
      this.scrollBottom();
      this.$forceUpdate();
    },
    send() {
      console.log(this.text);
      if (this.text === "") {
        this.errMsg = "发送内容不能为空";
        this.showErrMsg = true;
        let that = this;
        setTimeout(function () {
          that.showErrMsg = false;
        }, 1000);
        return;
      }
      var msg = this.nim.sendText({
        scene: this.scene,
        to: this.toAccount,
        text: this.text,
        done: this.sendMsgDone,
      });
      this.text = "";
      console.log("正在发送p2p text消息, id=" + msg.idClient);
    },
    sendMsgDone(error, msg) {
      console.log(
        "发送" +
          msg.scene +
          " " +
          msg.type +
          "消息" +
          (!error ? "成功" : "失败") +
          ", id=" +
          msg.idClient,
        error,
        msg
      );
      this.sessionsList.push(msg);
      this.scrollBottom();
    },
    switchUserDialogue(m) {
      this.sessionsList = [];
      this.scene = m.scene;
      this.toAccount = m.to;
      this.toUserImg = m.avatar;
      this.toUserName = m.nick;
      for (let i = 0; i < this.dataList.sessions.length; i++) {
        if (this.dataList.sessions[i].to === m.to) {
          this.dataList.sessions[i].showBgc = true;
        } else {
          this.dataList.sessions[i].showBgc = false;
        }
      }
      this.nim.resetSessionUnread(m.id);
      this.nim.getHistoryMsgs({
        scene: this.scene,
        to: this.toAccount,
        asc: true,
        done: this.getHistoryMsgsDone,
      });
    },
    getHistoryMsgsDone(error, obj) {
      console.log("获取云端历史记录" + (!error ? "成功" : "失败"), error, obj);
      if (!error) {
        for (let i = 0; i < this.dataList.users.length; i++) {
          if (this.dataList.users[i].account === this.toAccount) {
            for (let j = 0; j < obj.msgs.length; j++) {
              obj.msgs[j].avatar = this.dataList.users[i].avatar;
            }
          }
        }
        this.sessionsList = obj.msgs;
        console.log(this.sessionsList);
        this.setMsgTime();
        this.scrollBottom();
      }
    },
    scrollBottom() {
      if (this.toAccount !== "") {
        var vs_char_view = document.getElementById("vs_char_view");
        vs_char_view.scrollTop = vs_char_view.scrollHeight;
      }
    },
    setMsgTime() {
      for (let i = 0; i < this.sessionsList.length; i++) {
        if (i === 0) {
          this.sessionsList[i].printTime = this.formatTime(
            this.sessionsList[i].time
          );
        } else {
          if (
            this.sessionsList[i].time - 120000 >
            this.sessionsList[i - 1].time
          ) {
            this.sessionsList[i].printTime = this.formatTime(
              this.sessionsList[i].time
            );
          }
        }
      }
      this.loading1 = false;
      console.log(this.sessionsList);
    },
    addUserNameAvatar() {
      for (let i = 0; i < this.dataList.users.length; i++) {
        for (let j = 0; j < this.dataList.sessions.length; j++) {
          if (this.dataList.users[i].account === this.dataList.sessions[j].to) {
            this.dataList.sessions[j].avatar = this.dataList.users[i].avatar;
            this.dataList.sessions[j].nick = this.dataList.users[i].nick;
            this.dataList.sessions[j].updateTimeHour = this.formatTime(
              this.dataList.sessions[j].updateTime
            );
          }
        }
      }
    },
    init() {
      let that = this;
      that.loading = true;
      if (this.appKey === "" || this.account === "" || this.token === "") {
        return;
      }
      var nim = new NIM({
        // 初始化SDK
        // debug: true
        appKey: this.appKey,
        account: this.account,
        token: this.token,
        onconnect: this.onConnect,
        onerror: this.onError,
        onwillreconnect: this.onWillReconnect,
        ondisconnect: this.onDisconnect,
        // 多端
        onloginportschange: this.onLoginPortsChange,
        // 用户关系
        onblacklist: this.onBlacklist,
        onsyncmarkinblacklist: this.onMarkInBlacklist,
        onmutelist: this.onMutelist,
        onsyncmarkinmutelist: this.onMarkInMutelist,
        // 好友关系
        onfriends: this.onFriends,
        onsyncfriendaction: this.onSyncFriendAction,
        // 用户名片
        onmyinfo: this.onMyInfo,
        onupdatemyinfo: this.onUpdateMyInfo,
        onusers: this.onUsers,
        onupdateuser: this.onUpdateUser,
        // // 超大群
        // onSuperTeams: onSuperTeams,
        // onSyncCreateSuperTeam: onSyncCreateSuperTeam,
        // onDismissSuperTeam: onDismissSuperTeam,
        // onUpdateSuperTeamMember: onUpdateSuperTeamMember,
        // onUpdateSuperTeam: onUpdateSuperTeam, // 更新超大群的回调
        // onAddSuperTeamMembers: onAddSuperTeamMembers, // 新成员入超大群的回调
        // onRemoveSuperTeamMembers: onRemoveSuperTeamMembers
        // // 群组
        // onteams: onTeams,
        // onsynccreateteam: onCreateTeam,
        // onteammembers: onTeamMembers,
        // onsyncteammembersdone: onSyncTeamMembersDone,
        // onupdateteammember: onUpdateTeamMember,
        // 会话
        onsessions: this.onSessions,
        onupdatesession: this.onUpdateSession,
        // 消息
        onroamingmsgs: this.onRoamingMsgs,
        onofflinemsgs: this.onOfflineMsgs,
        onmsg: this.onMsg,
        // 系统通知
        onofflinesysmsgs: this.onOfflineSysMsgs,
        onsysmsg: this.onSysMsg,
        onupdatesysmsg: this.onUpdateSysMsg,
        onsysmsgunread: this.onSysMsgUnread,
        onupdatesysmsgunread: this.onUpdateSysMsgUnread,
        onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs,
        oncustomsysmsg: this.onCustomSysMsg,
        // 同步完成
        onsyncdone: this.onSyncDone,
      });

      this.dataList = this.dataList;
      this.nim = nim;
      // this.addUserNameAvatar()
      console.log(this.dataList);
      this.$forceUpdate();
    },
    onConnect() {
      console.log("连接成功");
    },
    onWillReconnect(obj) {
      // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log("即将重连", obj);
    },
    onDisconnect(error) {
      // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log("连接断开", error);
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            this.loginError = true;
            break;
          // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break;
          // 被踢, 请提示错误后跳转到登录页面
          case "kicked":
            break;
          default:
            break;
        }
      }
    },
    onError(error, obj) {
      console.log("发生错误", error, obj);
    },
    onLoginPortsChange(loginPorts) {
      console.log("当前登录帐号在其它端的状态发生改变了", loginPorts);
    },
    onBlacklist(blacklist) {
      console.log("收到黑名单", blacklist);
      this.dataList.blacklist = this.nim.mergeRelations(
        this.dataList.blacklist,
        blacklist
      );
      this.dataList.blacklist = this.nim.cutRelations(
        this.dataList.blacklist,
        blacklist.invalid
      );
      this.refreshBlacklistUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onMarkInBlacklist(obj) {
      console.log(
        obj.account + "被你" + (obj.isAdd ? "加入" : "移除") + "黑名单",
        obj
      );
      if (obj.isAdd) {
        this.addToBlacklist(obj);
      } else {
        this.removeFromBlacklist(obj);
      }
    },
    addToBlacklist(obj) {
      this.dataList.blacklist = this.nim.mergeRelations(
        this.dataList.blacklist,
        obj.record
      );
      this.refreshBlacklistUI();
    },
    removeFromBlacklist(obj) {
      this.dataList.blacklist = this.nim.cutRelations(
        this.dataList.blacklist,
        obj.record
      );
      this.refreshBlacklistUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    refreshBlacklistUI() {
      // 刷新界面
    },
    onMutelist(mutelist) {
      console.log("收到静音列表", mutelist);
      this.dataList.mutelist = this.nim.mergeRelations(
        this.dataList.mutelist,
        mutelist
      );
      this.dataList.mutelist = this.nim.cutRelations(
        this.dataList.mutelist,
        mutelist.invalid
      );
      this.refreshMutelistUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onMarkInMutelist(obj) {
      console.log(
        obj.account + "被你" + (obj.isAdd ? "加入" : "移除") + "静音列表",
        obj
      );
      if (obj.isAdd) {
        this.addToMutelist(obj);
      } else {
        this.removeFromMutelist(obj);
      }
    },
    addToMutelist(obj) {
      this.dataList.mutelist = this.nim.mergeRelations(
        this.dataList.mutelist,
        obj.record
      );
      this.refreshMutelistUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    removeFromMutelist(obj) {
      this.dataList.mutelist = this.nim.cutRelations(
        this.dataList.mutelist,
        obj.record
      );
      this.refreshMutelistUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    refreshMutelistUI() {
      // 刷新界面
    },
    onFriends(friends) {
      console.log("收到好友列表", friends);
      this.dataList.friends = this.nim.mergeFriends(
        this.dataList.friends,
        friends
      );
      this.dataList.friends = this.nim.cutFriends(
        this.dataList.friends,
        friends.invalid
      );
      this.refreshFriendsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onSyncFriendAction(obj) {
      console.log("收到好友操作", obj);
      switch (obj.type) {
        case "addFriend":
          console.log("你在其它端直接加了一个好友" + obj);
          this.onAddFriend(obj.friend);
          break;
        case "applyFriend":
          console.log("你在其它端申请加了一个好友" + obj);
          break;
        case "passFriendApply":
          console.log("你在其它端通过了一个好友申请" + obj);
          this.onAddFriend(obj.friend);
          break;
        case "rejectFriendApply":
          console.log("你在其它端拒绝了一个好友申请" + obj);
          break;
        case "deleteFriend":
          console.log("你在其它端删了一个好友" + obj);
          this.onDeleteFriend(obj.account);
          break;
        case "updateFriend":
          console.log("你在其它端更新了一个好友", obj);
          this.onUpdateFriend(obj.friend);
          break;
      }
    },
    onAddFriend(friend) {
      this.dataList.friends = this.nim.mergeFriends(
        this.dataList.friends,
        friend
      );
      this.refreshFriendsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onDeleteFriend(account) {
      this.dataList.friends = this.nim.cutFriendsByAccounts(
        this.dataList.friends,
        account
      );
      this.refreshFriendsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onUpdateFriend(friend) {
      this.dataList.friends = this.nim.mergeFriends(
        this.dataList.friends,
        friend
      );
      refreshFriendsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    refreshFriendsUI() {
      // 刷新界面
    },
    onMyInfo(user) {
      console.log("收到我的名片", user);
      this.dataList.myInfo = user;
      this.updateMyInfoUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onUpdateMyInfo(user) {
      console.log("我的名片更新了", user);
      this.dataList.myInfo = NIM.util.merge(this.dataList.myInfo, user);
      this.updateMyInfoUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    updateMyInfoUI() {
      // 刷新界面
    },
    onUsers(users) {
      console.log("收到用户名片列表", users);
      this.dataList.users = this.nim.mergeUsers(this.dataList.users, users);
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onUpdateUser(user) {
      console.log("用户名片更新了", user);
      this.dataList.users = this.nim.mergeUsers(this.dataList.users, user);
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onSuperTeams(superTeams) {
      console.log("收到超大群列表", superTeams);
      this.dataList.superTeams = this.nim.mergeTeams(
        this.dataList.superTeams,
        superTeams
      );
      this.onInvalidSuperTeams(superTeams.invalid);
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onInvalidSuperTeams(teams) {
      this.dataList.superTeams = this.nim.cutTeams(
        this.dataList.superTeams,
        teams
      );
      this.dataList.invalidSuperTeams = this.nim.mergeTeams(
        this.dataList.invalidSuperTeams,
        teams
      );
      this.refreshSuperTeamsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onSyncCreateSuperTeam(team, owner) {
      console.log("创建了一个超大群 onSyncCreateSuperTeam ", team, owner);
      this.dataList.superTeams = this.nim.mergeTeams(
        this.dataList.superTeams,
        team
      );
      this.refreshSuperTeamsUI();
      onSuperTeamMembers({
        teamId: team.teamId,
        members: owner,
      });
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onAddSuperTeamMembers(team, accounts, members) {
      console.log("添加群成员 onAddSuperTeamMembers ", team, accounts, members);
      if (!accounts && !members) {
        accounts = team.accounts || [];
        members = team.members || [];
        team = team.team || {};
      }
      var teamId = team.teamId;

      // 如果是别人被拉进来了，那么拼接群成员列表
      // 如果是自己被拉进来了，那么同步一次群成员列表

      if (accounts.indexOf(this.dataList.account) === -1) {
        onSuperTeamMembers({
          teamId: teamId,
          members: members,
        });
      } else {
        // ...
      }
      this.onSuperTeams(team);
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onDismissSuperTeam(obj) {
      console.log("解散超大群 onDismissSuperTeam", obj);
      var teamId = obj.teamId;
      this.removeAllSuperTeamMembers(teamId);
      this.dataList.superTeams = this.nim.cutTeams(
        this.dataList.superTeams,
        obj
      );
      this.refreshSuperTeamsUI();
      this.refreshSuperTeamMembersUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onRemoveSuperTeamMembers(obj) {
      console.log("移除了群成员 onRemoveSuperTeamMembers ", obj.accounts, obj);
      var teamId = obj.team.teamId;
      var accounts = obj.accounts;
      var team;
      if (!teamId && !accounts) {
        accounts = obj.accounts || [];
      }
      // 如果是别人被踢了，那么移除群成员
      // 如果是自己被踢了，那么离开该群
      if (accounts.indexOf(this.dataList.account) === -1) {
        if (team) {
          this.onSuperTeams(team);
        }
        if (!this.dataList.superTeamMembers) {
          this.dataList.superTeamMembers = {};
        }
        this.dataList.superTeamMembers[
          teamId
        ] = this.nim.cutTeamMembersByAccounts(
          this.dataList.superTeamMembers[teamId],
          teamId,
          accounts
        );
        this.refreshSuperTeamMembersUI();
      } else {
        this.leaveSuperTeam(teamId);
      }
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onUpdateSuperTeam(err, msg) {
      console.log("更新了超大群 teamId", err, msg);
    },
    onUpdateSuperTeamMember(member) {
      console.log("群成员信息更新了", member);
    },
    leaveSuperTeam(teamId) {
      this.onInvalidSuperTeams({
        teamId: teamId,
      });
      this.removeAllSuperTeamMembers(teamId);
    },
    refreshSuperTeamsUI() {},
    refreshSuperTeamMembersUI() {},
    removeAllSuperTeamMembers() {},
    onTeams(teams) {
      console.log("群列表", teams);
      this.dataList.teams = this.nim.mergeTeams(this.dataList.teams, teams);
      this.onInvalidTeams(teams.invalid);
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onInvalidTeams(teams) {
      this.dataList.teams = this.nim.cutTeams(this.dataList.teams, teams);
      this.dataList.invalidTeams = this.nim.mergeTeams(
        this.dataList.invalidTeams,
        teams
      );
      this.refreshTeamsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onCreateTeam(team) {
      console.log("你创建了一个群", team);
      this.dataList.teams = this.nim.mergeTeams(this.dataList.teams, team);
      this.refreshTeamsUI();
      this.onTeamMembers({
        teamId: team.teamId,
        members: owner,
      });
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    refreshTeamsUI() {
      // 刷新界面
    },
    onTeamMembers(obj) {
      console.log("收到群成员", obj);
      var teamId = obj.teamId;
      var members = obj.members;
      this.dataList.teamMembers = this.dataList.teamMembers || {};
      this.dataList.teamMembers[teamId] = this.nim.mergeTeamMembers(
        this.dataList.teamMembers[teamId],
        members
      );
      this.dataList.teamMembers[teamId] = this.nim.cutTeamMembers(
        this.dataList.teamMembers[teamId],
        members.invalid
      );
      this.refreshTeamMembersUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onSyncTeamMembersDone() {
      console.log("同步群列表完成");
    },
    onUpdateTeamMember(teamMember) {
      console.log("群成员信息更新了", teamMember);
      this.onTeamMembers({
        teamId: teamMember.teamId,
        members: teamMember,
      });
    },
    refreshTeamMembersUI() {
      // 刷新界面
    },
    onSessions(sessions) {
      console.log("收到会话列表", sessions);
      this.dataList.sessions = this.nim.mergeSessions(
        this.dataList.sessions,
        sessions
      );
      this.addUserNameAvatar();
      this.updateSessionsUI();
    },
    onUpdateSession(session) {
      this.loading1 = true;
      console.log("会话更新了", session);
      this.dataList.sessions = this.nim.mergeSessions(
        this.dataList.sessions,
        session
      );
      this.updateSessionsUI();
      this.dataList = this.dataList;
      this.addUserNameAvatar();
      this.$forceUpdate();
    },
    updateSessionsUI() {
      // 刷新界面
    },
    onRoamingMsgs(obj) {
      console.log("漫游消息", obj);
      this.pushMsg(obj.msgs);
    },
    onOfflineMsgs(obj) {
      console.log("离线消息", obj);
      this.pushMsg(obj.msgs);
    },
    onMsg(msg) {
      console.log("收到消息", msg.scene, msg.type, msg);
      this.sessionsList.push(msg);
      this.scrollBottom();
      for (let i = 0; i < this.dataList.users.length; i++) {
        if (
          this.dataList.users[i].account ===
          this.sessionsList[this.sessionsList.length - 1].from
        ) {
          this.sessionsList[
            this.sessionsList.length - 1
          ].avatar = this.dataList.users[i].avatar;
        }
      }
      this.$forceUpdate();
      this.pushMsg(msg);
    },
    pushMsg(msgs) {
      if (!Array.isArray(msgs)) {
        msgs = [msgs];
      }
      var sessionId = msgs[0].sessionId;
      this.dataList.msgs = this.dataList.msgs || {};
      this.dataList.msgs[sessionId] = this.nim.mergeMsgs(
        this.dataList.msgs[sessionId],
        msgs
      );
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onOfflineSysMsgs(sysMsgs) {
      console.log("收到离线系统通知", sysMsgs);
      this.pushSysMsgs(sysMsgs);
    },
    onSysMsg(sysMsg) {
      console.log("收到系统通知", sysMsg);
      this.pushSysMsgs(sysMsg);
    },
    onUpdateSysMsg(sysMsg) {
      this.pushSysMsgs(sysMsg);
    },
    pushSysMsgs(sysMsgs) {
      this.dataList.sysMsgs = this.nim.mergeSysMsgs(
        this.dataList.sysMsgs,
        sysMsgs
      );
      this.refreshSysMsgsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onSysMsgUnread(obj) {
      console.log("收到系统通知未读数", obj);
      this.dataList.sysMsgUnread = obj;
      this.refreshSysMsgsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    onUpdateSysMsgUnread(obj) {
      console.log("系统通知未读数更新了", obj);
      this.dataList.sysMsgUnread = obj;
      this.refreshSysMsgsUI();
      this.dataList = this.dataList;
      this.$forceUpdate();
    },
    refreshSysMsgsUI() {
      // 刷新界面
    },
    onOfflineCustomSysMsgs(sysMsgs) {
      console.log("收到离线自定义系统通知", sysMsgs);
    },
    onCustomSysMsg(sysMsg) {
      console.log("收到自定义系统通知", sysMsg);
    },
    onSyncDone() {
      console.log("同步完成");
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.vs_char {
  width: 100%;
  height: 652px;
  position: relative;
  height: calc(100vh - 270px);
}
.vs_char_list {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.vs_char_user {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 10px 20px 10px;
  background-color: #2c3e50;
  color: #fff;
}
.vs_char_user_img {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  margin-right: 10px;
  overflow: hidden;
}
.vs_char_user_name {
  width: 120px;
  white-space: nowrap;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  color: #333;
  margin-bottom: 2px;
}
.vs_char_user_lastMsg {
  width: 120px;
  white-space: nowrap;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.vs_char_user_list_dot {
  text-align: center;
  margin-left: auto;
  width: 40px;
}
.vs_char_user_time_num {
  font-size: 12px;
  color: #666;
}
.vs_char_user_unread {
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  border-radius: 16px;
  font-size: 12px;
  background-color: #ff3333;
  color: #fff;
  margin: 0 auto;
  margin-top: 4px;
}

.vs_char_user_list_wraper {
  width: 255px;
}
.vs_char_user_list {
  height: 76px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 18px;
  cursor: pointer;
  color: #999;
}
.vs_char_user_list:hover {
  background-color: #e8efec;
}
.vs_char_user_list_bgc {
  background-color: #e8efec;
}
.vs_char_user_list_img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-right: 10px;
  overflow: hidden;
}

.vs_char_wrap {
  width: calc(100% - 255px);
  height: 100%;
  margin-left: 255px;
  position: relative;
}

.vs_char_top {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  background-color: white;
  padding: 0 15px;
}
.vs_char_top_to {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.vs_char_top_to_img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
}
.vs_char_top_to_name {
  font-size: 14px;
  color: #666;
}

.vs_char_top_more {
  width: 50px;
  height: 30px;
  background-color: red;
}

.vs_char_view {
  width: 100%;
  height: calc(100% - 184px);
  background-color: #e8efec;
  position: absolute;
  overflow: auto;
}
.vs_char_view_time {
  color: #333;
  font-size: 12px;
  text-align: center;
}
.vs_char_view_info {
  width: 100%;
  height: 1000px;
}

.vs_char_view_info_wraper {
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 18px;
  align-items: center;
}
.vs_char_view_user_info_avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 40px;
  overflow: hidden;
}
.vs_char_view_info_wraper {
}
.vs_char_view_user_info_text {
  width: auto;
  max-width: calc(70% - 100px);
  word-break: break-all;
  border-radius: 12px;
  line-height: 20px;
  text-align: left;
  font-size: 16px;

  padding: 14px 38px;
  background-color: #fff;
  color: #333;
}

.vs_char_view_info_wraper_right .vs_char_view_user_info_text {
  color: #fff;
  background-color: #00b54d;
}
.vs_char_view_user_info_img {
  width: calc(50% - 100px);
  height: 140px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}
.vs_char_view_user_info_img_right {
  margin-right: 10px;
}
.vs_char_view_info_wraper_right {
  justify-content: flex-end;
}
.vs_char_view_user_info_text_right {
  margin-right: 10px;
  width: auto;
  max-width: calc(70% - 100px);
}
.vs_char_view_user_info_avatar_right {
  margin-right: 0;
}

.vs_char_enter {
  width: 100%;
  height: 180px;
  background-color: #f3f6f5;
  position: absolute;
  bottom: 0px;
  padding: 10px 30px;
}
.vs_char_textarea {
  width: calc(100% - 100px);
  position: absolute;
  left: 15px;
  height: 70px;
  resize: none;
  padding: 5px;
  line-height: 16px;
  font-size: 14px;
}
.vs_char_btn {
  position: absolute;
  bottom: 15px;
  right: 30px;
}

img {
  width: 100%;
  height: 100%;
}

.vs_char_enter_wraper {
  height: 30px;
  display: flex;
  justify-content: flex-start;
}

.vs_char_enter_list {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}

#uploadFile {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  overflow: hidden;
  opacity: 0;
  cursor: pointer;
}

.vs_char_err {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  color: white;
  top: 50%;
  left: 30%;
  border-radius: 5px;
  font-size: 14px;
}

.login_error {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.login_error_info {
  padding: 10px 20px;
  color: firebrick;
  font-size: 14px;
  background-color: white;
  border-radius: 5px;
  font-weight: bold;
}

.vs_char_user_list_wraper::-webkit-scrollbar {
  width: 8px;
}
.vs_char_user_list_wraper::-webkit-scrollbar-track {
  background-color: #2c3e50;
}
.vs_char_user_list_wraper::-webkit-scrollbar-thumb {
  background-color: #666;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.vs_char_view::-webkit-scrollbar {
  width: 8px;
}
.vs_char_view::-webkit-scrollbar-track {
  background-color: #f3f6f5;

}
.vs_char_view::-webkit-scrollbar-thumb {
    background-color: rgba(214,217,218);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::v-deep .el-textarea__inner {
  height: 100%;
}
</style>