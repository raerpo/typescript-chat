"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var io = require("socket.io-client");
var styles = require("./styles");
/* Latinchat chatroom */
var socket = io();
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            message: '',
            messageList: []
        };
        _this.handleChangeMessage = function (e) {
            _this.setState({
                message: e.currentTarget.value
            });
        };
        _this.handleSubmitWithEnterKey = function (e) {
            if (e.key === 'Enter') {
                _this.handleSendMessage();
            }
        };
        _this.handleSendMessage = function () {
            if (_this.state.message === '')
                return;
            var message = { message: _this.state.message };
            socket.emit('send message', message);
            // Clear message after send
            _this.setState({
                message: ''
            });
        };
        _this.renderMessages = function (messages) {
            return messages.map(function (message, index) { return React.createElement("li", { key: index }, message); });
        };
        return _this;
    }
    Chat.prototype.componentDidMount = function () {
        var _this = this;
        // On every message, we should change the state
        socket.on('message', function (message) {
            var chat = _this.state.messageList;
            var newMessage = message.message;
            _this.setState({
                messageList: chat.concat(newMessage)
            });
        });
    };
    Chat.prototype.render = function () {
        return (React.createElement(styles.ChatStyles, null,
            React.createElement(styles.MessagesStyles, null,
                React.createElement(styles.MessagesContainerStyles, null,
                    React.createElement("ul", null, this.renderMessages(this.state.messageList))),
                React.createElement(styles.ChatControlsStyles, null,
                    React.createElement("input", { type: "text", value: this.state.message, onChange: this.handleChangeMessage, onKeyPress: this.handleSubmitWithEnterKey }),
                    React.createElement("button", { onClick: this.handleSendMessage }, "Enviar")))));
    };
    return Chat;
}(React.Component));
var LatinChatHome = /** @class */ (function (_super) {
    __extends(LatinChatHome, _super);
    function LatinChatHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            nickname: ''
        };
        _this.handleChangeNicknameInput = function (e) {
            _this.setState({
                nickname: e.currentTarget.value
            });
        };
        _this.handleSetNickName = function () {
            _this.props.setNickName(_this.state.nickname);
        };
        return _this;
    }
    LatinChatHome.prototype.render = function () {
        return (React.createElement(styles.LatinChatHome, null,
            React.createElement("div", null,
                React.createElement("img", { src: "http://photos1.blogger.com/blogger/1102/2841/320/latinchat.jpg", alt: "" })),
            React.createElement(styles.LatinChatHomeInputNickname, null,
                React.createElement(styles.LatinChatHomeRoomTitle, null, "Sala Rosa"),
                React.createElement("label", { htmlFor: "nickname" }, "Ingresa tu nickname"),
                React.createElement("input", { type: "text", name: "nickname", id: "nickname", value: this.state.nickname, onChange: this.handleChangeNicknameInput }),
                React.createElement("br", null),
                React.createElement("button", { onClick: this.handleSetNickName }, "Entrar"))));
    };
    return LatinChatHome;
}(React.Component));
/* Latinchat app */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            nickname: ''
        };
        _this.setNickName = function (nickname) {
            _this.setState({
                nickname: nickname
            });
        };
        return _this;
    }
    App.prototype.render = function () {
        var nickname = this.state.nickname;
        return nickname === '' ? (React.createElement(LatinChatHome, { setNickName: this.setNickName })) : (React.createElement(Chat, { nickname: nickname }));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));
