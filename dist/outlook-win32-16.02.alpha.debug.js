/* Outlook Win32 specific API library */
/* osfweb version: 16.0.11804.10000 */
/* office-js-api version: 20190927.5 */
/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/
/*
    Your use of this file is governed by the Microsoft Services Agreement http://go.microsoft.com/fwlink/?LinkId=266419.

    This file also contains the following Promise implementation (with a few small modifications):
        * @overview es6-promise - a tiny implementation of Promises/A+.
        * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
        * @license   Licensed under MIT license
        *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
        * @version   2.3.0
*/
/* Outlook rich client specific API library */
/* Version: 16.0.11804.10000 */
/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/


/*
    Your use of this file is governed by the Microsoft Services Agreement http://go.microsoft.com/fwlink/?LinkId=266419.

    This file also contains the following Promise implementation (with a few small modifications):
        * @overview es6-promise - a tiny implementation of Promises/A+.
        * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
        * @license   Licensed under MIT license
        *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
        * @version   2.3.0
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OfficeExt;
(function (OfficeExt) {
    var MicrosoftAjaxFactory = (function () {
        function MicrosoftAjaxFactory() {
        }
        MicrosoftAjaxFactory.prototype.isMsAjaxLoaded = function () {
            if (typeof (Sys) !== 'undefined' && typeof (Type) !== 'undefined' &&
                Sys.StringBuilder && typeof (Sys.StringBuilder) === "function" &&
                Type.registerNamespace && typeof (Type.registerNamespace) === "function" &&
                Type.registerClass && typeof (Type.registerClass) === "function" &&
                typeof (Function._validateParams) === "function" &&
                Sys.Serialization && Sys.Serialization.JavaScriptSerializer && typeof (Sys.Serialization.JavaScriptSerializer.serialize) === "function") {
                return true;
            }
            else {
                return false;
            }
        };
        MicrosoftAjaxFactory.prototype.loadMsAjaxFull = function (callback) {
            var msAjaxCDNPath = (window.location.protocol.toLowerCase() === 'https:' ? 'https:' : 'http:') + '//ajax.aspnetcdn.com/ajax/3.5/MicrosoftAjax.js';
            OSF.OUtil.loadScript(msAjaxCDNPath, callback);
        };
        Object.defineProperty(MicrosoftAjaxFactory.prototype, "msAjaxError", {
            get: function () {
                if (this._msAjaxError == null && this.isMsAjaxLoaded()) {
                    this._msAjaxError = Error;
                }
                return this._msAjaxError;
            },
            set: function (errorClass) {
                this._msAjaxError = errorClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MicrosoftAjaxFactory.prototype, "msAjaxString", {
            get: function () {
                if (this._msAjaxString == null && this.isMsAjaxLoaded()) {
                    this._msAjaxString = String;
                }
                return this._msAjaxString;
            },
            set: function (stringClass) {
                this._msAjaxString = stringClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MicrosoftAjaxFactory.prototype, "msAjaxDebug", {
            get: function () {
                if (this._msAjaxDebug == null && this.isMsAjaxLoaded()) {
                    this._msAjaxDebug = Sys.Debug;
                }
                return this._msAjaxDebug;
            },
            set: function (debugClass) {
                this._msAjaxDebug = debugClass;
            },
            enumerable: true,
            configurable: true
        });
        return MicrosoftAjaxFactory;
    })();
    OfficeExt.MicrosoftAjaxFactory = MicrosoftAjaxFactory;
})(OfficeExt || (OfficeExt = {}));
var OsfMsAjaxFactory = new OfficeExt.MicrosoftAjaxFactory();
var OSF = OSF || {};
var OfficeExt;
(function (OfficeExt) {
    var SafeStorage = (function () {
        function SafeStorage(_internalStorage) {
            this._internalStorage = _internalStorage;
        }
        SafeStorage.prototype.getItem = function (key) {
            try {
                return this._internalStorage && this._internalStorage.getItem(key);
            }
            catch (e) {
                return null;
            }
        };
        SafeStorage.prototype.setItem = function (key, data) {
            try {
                this._internalStorage && this._internalStorage.setItem(key, data);
            }
            catch (e) {
            }
        };
        SafeStorage.prototype.clear = function () {
            try {
                this._internalStorage && this._internalStorage.clear();
            }
            catch (e) {
            }
        };
        SafeStorage.prototype.removeItem = function (key) {
            try {
                this._internalStorage && this._internalStorage.removeItem(key);
            }
            catch (e) {
            }
        };
        SafeStorage.prototype.getKeysWithPrefix = function (keyPrefix) {
            var keyList = [];
            try {
                var len = this._internalStorage && this._internalStorage.length || 0;
                for (var i = 0; i < len; i++) {
                    var key = this._internalStorage.key(i);
                    if (key.indexOf(keyPrefix) === 0) {
                        keyList.push(key);
                    }
                }
            }
            catch (e) {
            }
            return keyList;
        };
        return SafeStorage;
    })();
    OfficeExt.SafeStorage = SafeStorage;
})(OfficeExt || (OfficeExt = {}));
OSF.XdmFieldName = {
    ConversationUrl: "ConversationUrl",
    AppId: "AppId"
};
OSF.WindowNameItemKeys = {
    BaseFrameName: "baseFrameName",
    HostInfo: "hostInfo",
    XdmInfo: "xdmInfo",
    SerializerVersion: "serializerVersion",
    AppContext: "appContext"
};
OSF.OUtil = (function () {
    var _uniqueId = -1;
    var _xdmInfoKey = '&_xdm_Info=';
    var _serializerVersionKey = '&_serializer_version=';
    var _xdmSessionKeyPrefix = '_xdm_';
    var _serializerVersionKeyPrefix = '_serializer_version=';
    var _fragmentSeparator = '#';
    var _fragmentInfoDelimiter = '&';
    var _classN = "class";
    var _loadedScripts = {};
    var _defaultScriptLoadingTimeout = 30000;
    var _safeSessionStorage = null;
    var _safeLocalStorage = null;
    var _rndentropy = new Date().getTime();
    function _random() {
        var nextrand = 0x7fffffff * (Math.random());
        nextrand ^= _rndentropy ^ ((new Date().getMilliseconds()) << Math.floor(Math.random() * (31 - 10)));
        return nextrand.toString(16);
    }
    ;
    function _getSessionStorage() {
        if (!_safeSessionStorage) {
            try {
                var sessionStorage = window.sessionStorage;
            }
            catch (ex) {
                sessionStorage = null;
            }
            _safeSessionStorage = new OfficeExt.SafeStorage(sessionStorage);
        }
        return _safeSessionStorage;
    }
    ;
    function _reOrderTabbableElements(elements) {
        var bucket0 = [];
        var bucketPositive = [];
        var i;
        var len = elements.length;
        var ele;
        for (i = 0; i < len; i++) {
            ele = elements[i];
            if (ele.tabIndex) {
                if (ele.tabIndex > 0) {
                    bucketPositive.push(ele);
                }
                else if (ele.tabIndex === 0) {
                    bucket0.push(ele);
                }
            }
            else {
                bucket0.push(ele);
            }
        }
        bucketPositive = bucketPositive.sort(function (left, right) {
            var diff = left.tabIndex - right.tabIndex;
            if (diff === 0) {
                diff = bucketPositive.indexOf(left) - bucketPositive.indexOf(right);
            }
            return diff;
        });
        return [].concat(bucketPositive, bucket0);
    }
    ;
    return {
        set_entropy: function OSF_OUtil$set_entropy(entropy) {
            if (typeof entropy == "string") {
                for (var i = 0; i < entropy.length; i += 4) {
                    var temp = 0;
                    for (var j = 0; j < 4 && i + j < entropy.length; j++) {
                        temp = (temp << 8) + entropy.charCodeAt(i + j);
                    }
                    _rndentropy ^= temp;
                }
            }
            else if (typeof entropy == "number") {
                _rndentropy ^= entropy;
            }
            else {
                _rndentropy ^= 0x7fffffff * Math.random();
            }
            _rndentropy &= 0x7fffffff;
        },
        extend: function OSF_OUtil$extend(child, parent) {
            var F = function () { };
            F.prototype = parent.prototype;
            child.prototype = new F();
            child.prototype.constructor = child;
            child.uber = parent.prototype;
            if (parent.prototype.constructor === Object.prototype.constructor) {
                parent.prototype.constructor = parent;
            }
        },
        setNamespace: function OSF_OUtil$setNamespace(name, parent) {
            if (parent && name && !parent[name]) {
                parent[name] = {};
            }
        },
        unsetNamespace: function OSF_OUtil$unsetNamespace(name, parent) {
            if (parent && name && parent[name]) {
                delete parent[name];
            }
        },
        serializeSettings: function OSF_OUtil$serializeSettings(settingsCollection) {
            var ret = {};
            for (var key in settingsCollection) {
                var value = settingsCollection[key];
                try {
                    if (JSON) {
                        value = JSON.stringify(value, function dateReplacer(k, v) {
                            return OSF.OUtil.isDate(this[k]) ? OSF.DDA.SettingsManager.DateJSONPrefix + this[k].getTime() + OSF.DDA.SettingsManager.DataJSONSuffix : v;
                        });
                    }
                    else {
                        value = Sys.Serialization.JavaScriptSerializer.serialize(value);
                    }
                    ret[key] = value;
                }
                catch (ex) {
                }
            }
            return ret;
        },
        deserializeSettings: function OSF_OUtil$deserializeSettings(serializedSettings) {
            var ret = {};
            serializedSettings = serializedSettings || {};
            for (var key in serializedSettings) {
                var value = serializedSettings[key];
                try {
                    if (JSON) {
                        value = JSON.parse(value, function dateReviver(k, v) {
                            var d;
                            if (typeof v === 'string' && v && v.length > 6 && v.slice(0, 5) === OSF.DDA.SettingsManager.DateJSONPrefix && v.slice(-1) === OSF.DDA.SettingsManager.DataJSONSuffix) {
                                d = new Date(parseInt(v.slice(5, -1)));
                                if (d) {
                                    return d;
                                }
                            }
                            return v;
                        });
                    }
                    else {
                        value = Sys.Serialization.JavaScriptSerializer.deserialize(value, true);
                    }
                    ret[key] = value;
                }
                catch (ex) {
                }
            }
            return ret;
        },
        loadScript: function OSF_OUtil$loadScript(url, callback, timeoutInMs) {
            if (url && callback) {
                var doc = window.document;
                var _loadedScriptEntry = _loadedScripts[url];
                if (!_loadedScriptEntry) {
                    var script = doc.createElement("script");
                    script.type = "text/javascript";
                    _loadedScriptEntry = { loaded: false, pendingCallbacks: [callback], timer: null };
                    _loadedScripts[url] = _loadedScriptEntry;
                    var onLoadCallback = function OSF_OUtil_loadScript$onLoadCallback() {
                        if (_loadedScriptEntry.timer != null) {
                            clearTimeout(_loadedScriptEntry.timer);
                            delete _loadedScriptEntry.timer;
                        }
                        _loadedScriptEntry.loaded = true;
                        var pendingCallbackCount = _loadedScriptEntry.pendingCallbacks.length;
                        for (var i = 0; i < pendingCallbackCount; i++) {
                            var currentCallback = _loadedScriptEntry.pendingCallbacks.shift();
                            currentCallback();
                        }
                    };
                    var onLoadError = function OSF_OUtil_loadScript$onLoadError() {
                        delete _loadedScripts[url];
                        if (_loadedScriptEntry.timer != null) {
                            clearTimeout(_loadedScriptEntry.timer);
                            delete _loadedScriptEntry.timer;
                        }
                        var pendingCallbackCount = _loadedScriptEntry.pendingCallbacks.length;
                        for (var i = 0; i < pendingCallbackCount; i++) {
                            var currentCallback = _loadedScriptEntry.pendingCallbacks.shift();
                            currentCallback();
                        }
                    };
                    if (script.readyState) {
                        script.onreadystatechange = function () {
                            if (script.readyState == "loaded" || script.readyState == "complete") {
                                script.onreadystatechange = null;
                                onLoadCallback();
                            }
                        };
                    }
                    else {
                        script.onload = onLoadCallback;
                    }
                    script.onerror = onLoadError;
                    timeoutInMs = timeoutInMs || _defaultScriptLoadingTimeout;
                    _loadedScriptEntry.timer = setTimeout(onLoadError, timeoutInMs);
                    script.setAttribute("crossOrigin", "anonymous");
                    script.src = url;
                    doc.getElementsByTagName("head")[0].appendChild(script);
                }
                else if (_loadedScriptEntry.loaded) {
                    callback();
                }
                else {
                    _loadedScriptEntry.pendingCallbacks.push(callback);
                }
            }
        },
        loadCSS: function OSF_OUtil$loadCSS(url) {
            if (url) {
                var doc = window.document;
                var link = doc.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                doc.getElementsByTagName("head")[0].appendChild(link);
            }
        },
        parseEnum: function OSF_OUtil$parseEnum(str, enumObject) {
            var parsed = enumObject[str.trim()];
            if (typeof (parsed) == 'undefined') {
                OsfMsAjaxFactory.msAjaxDebug.trace("invalid enumeration string:" + str);
                throw OsfMsAjaxFactory.msAjaxError.argument("str");
            }
            return parsed;
        },
        delayExecutionAndCache: function OSF_OUtil$delayExecutionAndCache() {
            var obj = { calc: arguments[0] };
            return function () {
                if (obj.calc) {
                    obj.val = obj.calc.apply(this, arguments);
                    delete obj.calc;
                }
                return obj.val;
            };
        },
        getUniqueId: function OSF_OUtil$getUniqueId() {
            _uniqueId = _uniqueId + 1;
            return _uniqueId.toString();
        },
        formatString: function OSF_OUtil$formatString() {
            var args = arguments;
            var source = args[0];
            return source.replace(/{(\d+)}/gm, function (match, number) {
                var index = parseInt(number, 10) + 1;
                return args[index] === undefined ? '{' + number + '}' : args[index];
            });
        },
        generateConversationId: function OSF_OUtil$generateConversationId() {
            return [_random(), _random(), (new Date()).getTime().toString()].join('_');
        },
        getFrameName: function OSF_OUtil$getFrameName(cacheKey) {
            return _xdmSessionKeyPrefix + cacheKey + this.generateConversationId();
        },
        addXdmInfoAsHash: function OSF_OUtil$addXdmInfoAsHash(url, xdmInfoValue) {
            return OSF.OUtil.addInfoAsHash(url, _xdmInfoKey, xdmInfoValue, false);
        },
        addSerializerVersionAsHash: function OSF_OUtil$addSerializerVersionAsHash(url, serializerVersion) {
            return OSF.OUtil.addInfoAsHash(url, _serializerVersionKey, serializerVersion, true);
        },
        addInfoAsHash: function OSF_OUtil$addInfoAsHash(url, keyName, infoValue, encodeInfo) {
            url = url.trim() || '';
            var urlParts = url.split(_fragmentSeparator);
            var urlWithoutFragment = urlParts.shift();
            var fragment = urlParts.join(_fragmentSeparator);
            var newFragment;
            if (encodeInfo) {
                newFragment = [keyName, encodeURIComponent(infoValue), fragment].join('');
            }
            else {
                newFragment = [fragment, keyName, infoValue].join('');
            }
            return [urlWithoutFragment, _fragmentSeparator, newFragment].join('');
        },
        parseHostInfoFromWindowName: function OSF_OUtil$parseHostInfoFromWindowName(skipSessionStorage, windowName) {
            return OSF.OUtil.parseInfoFromWindowName(skipSessionStorage, windowName, OSF.WindowNameItemKeys.HostInfo);
        },
        parseXdmInfo: function OSF_OUtil$parseXdmInfo(skipSessionStorage) {
            var xdmInfoValue = OSF.OUtil.parseXdmInfoWithGivenFragment(skipSessionStorage, window.location.hash);
            if (!xdmInfoValue) {
                xdmInfoValue = OSF.OUtil.parseXdmInfoFromWindowName(skipSessionStorage, window.name);
            }
            return xdmInfoValue;
        },
        parseXdmInfoFromWindowName: function OSF_OUtil$parseXdmInfoFromWindowName(skipSessionStorage, windowName) {
            return OSF.OUtil.parseInfoFromWindowName(skipSessionStorage, windowName, OSF.WindowNameItemKeys.XdmInfo);
        },
        parseXdmInfoWithGivenFragment: function OSF_OUtil$parseXdmInfoWithGivenFragment(skipSessionStorage, fragment) {
            return OSF.OUtil.parseInfoWithGivenFragment(_xdmInfoKey, _xdmSessionKeyPrefix, false, skipSessionStorage, fragment);
        },
        parseSerializerVersion: function OSF_OUtil$parseSerializerVersion(skipSessionStorage) {
            var serializerVersion = OSF.OUtil.parseSerializerVersionWithGivenFragment(skipSessionStorage, window.location.hash);
            if (isNaN(serializerVersion)) {
                serializerVersion = OSF.OUtil.parseSerializerVersionFromWindowName(skipSessionStorage, window.name);
            }
            return serializerVersion;
        },
        parseSerializerVersionFromWindowName: function OSF_OUtil$parseSerializerVersionFromWindowName(skipSessionStorage, windowName) {
            return parseInt(OSF.OUtil.parseInfoFromWindowName(skipSessionStorage, windowName, OSF.WindowNameItemKeys.SerializerVersion));
        },
        parseSerializerVersionWithGivenFragment: function OSF_OUtil$parseSerializerVersionWithGivenFragment(skipSessionStorage, fragment) {
            return parseInt(OSF.OUtil.parseInfoWithGivenFragment(_serializerVersionKey, _serializerVersionKeyPrefix, true, skipSessionStorage, fragment));
        },
        parseInfoFromWindowName: function OSF_OUtil$parseInfoFromWindowName(skipSessionStorage, windowName, infoKey) {
            try {
                var windowNameObj = JSON.parse(windowName);
                var infoValue = windowNameObj != null ? windowNameObj[infoKey] : null;
                var osfSessionStorage = _getSessionStorage();
                if (!skipSessionStorage && osfSessionStorage && windowNameObj != null) {
                    var sessionKey = windowNameObj[OSF.WindowNameItemKeys.BaseFrameName] + infoKey;
                    if (infoValue) {
                        osfSessionStorage.setItem(sessionKey, infoValue);
                    }
                    else {
                        infoValue = osfSessionStorage.getItem(sessionKey);
                    }
                }
                return infoValue;
            }
            catch (Exception) {
                return null;
            }
        },
        parseInfoWithGivenFragment: function OSF_OUtil$parseInfoWithGivenFragment(infoKey, infoKeyPrefix, decodeInfo, skipSessionStorage, fragment) {
            var fragmentParts = fragment.split(infoKey);
            var infoValue = fragmentParts.length > 1 ? fragmentParts[fragmentParts.length - 1] : null;
            if (decodeInfo && infoValue != null) {
                if (infoValue.indexOf(_fragmentInfoDelimiter) >= 0) {
                    infoValue = infoValue.split(_fragmentInfoDelimiter)[0];
                }
                infoValue = decodeURIComponent(infoValue);
            }
            var osfSessionStorage = _getSessionStorage();
            if (!skipSessionStorage && osfSessionStorage) {
                var sessionKeyStart = window.name.indexOf(infoKeyPrefix);
                if (sessionKeyStart > -1) {
                    var sessionKeyEnd = window.name.indexOf(";", sessionKeyStart);
                    if (sessionKeyEnd == -1) {
                        sessionKeyEnd = window.name.length;
                    }
                    var sessionKey = window.name.substring(sessionKeyStart, sessionKeyEnd);
                    if (infoValue) {
                        osfSessionStorage.setItem(sessionKey, infoValue);
                    }
                    else {
                        infoValue = osfSessionStorage.getItem(sessionKey);
                    }
                }
            }
            return infoValue;
        },
        getConversationId: function OSF_OUtil$getConversationId() {
            var searchString = window.location.search;
            var conversationId = null;
            if (searchString) {
                var index = searchString.indexOf("&");
                conversationId = index > 0 ? searchString.substring(1, index) : searchString.substr(1);
                if (conversationId && conversationId.charAt(conversationId.length - 1) === '=') {
                    conversationId = conversationId.substring(0, conversationId.length - 1);
                    if (conversationId) {
                        conversationId = decodeURIComponent(conversationId);
                    }
                }
            }
            return conversationId;
        },
        getInfoItems: function OSF_OUtil$getInfoItems(strInfo) {
            var items = strInfo.split("$");
            if (typeof items[1] == "undefined") {
                items = strInfo.split("|");
            }
            if (typeof items[1] == "undefined") {
                items = strInfo.split("%7C");
            }
            return items;
        },
        getXdmFieldValue: function OSF_OUtil$getXdmFieldValue(xdmFieldName, skipSessionStorage) {
            var fieldValue = '';
            var xdmInfoValue = OSF.OUtil.parseXdmInfo(skipSessionStorage);
            if (xdmInfoValue) {
                var items = OSF.OUtil.getInfoItems(xdmInfoValue);
                if (items != undefined && items.length >= 3) {
                    switch (xdmFieldName) {
                        case OSF.XdmFieldName.ConversationUrl:
                            fieldValue = items[2];
                            break;
                        case OSF.XdmFieldName.AppId:
                            fieldValue = items[1];
                            break;
                    }
                }
            }
            return fieldValue;
        },
        validateParamObject: function OSF_OUtil$validateParamObject(params, expectedProperties, callback) {
            var e = Function._validateParams(arguments, [{ name: "params", type: Object, mayBeNull: false },
                { name: "expectedProperties", type: Object, mayBeNull: false },
                { name: "callback", type: Function, mayBeNull: true }
            ]);
            if (e)
                throw e;
            for (var p in expectedProperties) {
                e = Function._validateParameter(params[p], expectedProperties[p], p);
                if (e)
                    throw e;
            }
        },
        writeProfilerMark: function OSF_OUtil$writeProfilerMark(text) {
            if (window.msWriteProfilerMark) {
                window.msWriteProfilerMark(text);
                OsfMsAjaxFactory.msAjaxDebug.trace(text);
            }
        },
        outputDebug: function OSF_OUtil$outputDebug(text) {
            if (typeof (OsfMsAjaxFactory) !== 'undefined' && OsfMsAjaxFactory.msAjaxDebug && OsfMsAjaxFactory.msAjaxDebug.trace) {
                OsfMsAjaxFactory.msAjaxDebug.trace(text);
            }
        },
        defineNondefaultProperty: function OSF_OUtil$defineNondefaultProperty(obj, prop, descriptor, attributes) {
            descriptor = descriptor || {};
            for (var nd in attributes) {
                var attribute = attributes[nd];
                if (descriptor[attribute] == undefined) {
                    descriptor[attribute] = true;
                }
            }
            Object.defineProperty(obj, prop, descriptor);
            return obj;
        },
        defineNondefaultProperties: function OSF_OUtil$defineNondefaultProperties(obj, descriptors, attributes) {
            descriptors = descriptors || {};
            for (var prop in descriptors) {
                OSF.OUtil.defineNondefaultProperty(obj, prop, descriptors[prop], attributes);
            }
            return obj;
        },
        defineEnumerableProperty: function OSF_OUtil$defineEnumerableProperty(obj, prop, descriptor) {
            return OSF.OUtil.defineNondefaultProperty(obj, prop, descriptor, ["enumerable"]);
        },
        defineEnumerableProperties: function OSF_OUtil$defineEnumerableProperties(obj, descriptors) {
            return OSF.OUtil.defineNondefaultProperties(obj, descriptors, ["enumerable"]);
        },
        defineMutableProperty: function OSF_OUtil$defineMutableProperty(obj, prop, descriptor) {
            return OSF.OUtil.defineNondefaultProperty(obj, prop, descriptor, ["writable", "enumerable", "configurable"]);
        },
        defineMutableProperties: function OSF_OUtil$defineMutableProperties(obj, descriptors) {
            return OSF.OUtil.defineNondefaultProperties(obj, descriptors, ["writable", "enumerable", "configurable"]);
        },
        finalizeProperties: function OSF_OUtil$finalizeProperties(obj, descriptor) {
            descriptor = descriptor || {};
            var props = Object.getOwnPropertyNames(obj);
            var propsLength = props.length;
            for (var i = 0; i < propsLength; i++) {
                var prop = props[i];
                var desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (!desc.get && !desc.set) {
                    desc.writable = descriptor.writable || false;
                }
                desc.configurable = descriptor.configurable || false;
                desc.enumerable = descriptor.enumerable || true;
                Object.defineProperty(obj, prop, desc);
            }
            return obj;
        },
        mapList: function OSF_OUtil$MapList(list, mapFunction) {
            var ret = [];
            if (list) {
                for (var item in list) {
                    ret.push(mapFunction(list[item]));
                }
            }
            return ret;
        },
        listContainsKey: function OSF_OUtil$listContainsKey(list, key) {
            for (var item in list) {
                if (key == item) {
                    return true;
                }
            }
            return false;
        },
        listContainsValue: function OSF_OUtil$listContainsElement(list, value) {
            for (var item in list) {
                if (value == list[item]) {
                    return true;
                }
            }
            return false;
        },
        augmentList: function OSF_OUtil$augmentList(list, addenda) {
            var add = list.push ? function (key, value) { list.push(value); } : function (key, value) { list[key] = value; };
            for (var key in addenda) {
                add(key, addenda[key]);
            }
        },
        redefineList: function OSF_Outil$redefineList(oldList, newList) {
            for (var key1 in oldList) {
                delete oldList[key1];
            }
            for (var key2 in newList) {
                oldList[key2] = newList[key2];
            }
        },
        isArray: function OSF_OUtil$isArray(obj) {
            return Object.prototype.toString.apply(obj) === "[object Array]";
        },
        isFunction: function OSF_OUtil$isFunction(obj) {
            return Object.prototype.toString.apply(obj) === "[object Function]";
        },
        isDate: function OSF_OUtil$isDate(obj) {
            return Object.prototype.toString.apply(obj) === "[object Date]";
        },
        addEventListener: function OSF_OUtil$addEventListener(element, eventName, listener) {
            if (element.addEventListener) {
                element.addEventListener(eventName, listener, false);
            }
            else if ((Sys.Browser.agent === Sys.Browser.InternetExplorer) && element.attachEvent) {
                element.attachEvent("on" + eventName, listener);
            }
            else {
                element["on" + eventName] = listener;
            }
        },
        removeEventListener: function OSF_OUtil$removeEventListener(element, eventName, listener) {
            if (element.removeEventListener) {
                element.removeEventListener(eventName, listener, false);
            }
            else if ((Sys.Browser.agent === Sys.Browser.InternetExplorer) && element.detachEvent) {
                element.detachEvent("on" + eventName, listener);
            }
            else {
                element["on" + eventName] = null;
            }
        },
        getCookieValue: function OSF_OUtil$getCookieValue(cookieName) {
            var tmpCookieString = RegExp(cookieName + "[^;]+").exec(document.cookie);
            return tmpCookieString.toString().replace(/^[^=]+./, "");
        },
        xhrGet: function OSF_OUtil$xhrGet(url, onSuccess, onError) {
            var xmlhttp;
            try {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            onSuccess(xmlhttp.responseText);
                        }
                        else {
                            onError(xmlhttp.status);
                        }
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
            catch (ex) {
                onError(ex);
            }
        },
        xhrGetFull: function OSF_OUtil$xhrGetFull(url, oneDriveFileName, onSuccess, onError) {
            var xmlhttp;
            var requestedFileName = oneDriveFileName;
            try {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            onSuccess(xmlhttp, requestedFileName);
                        }
                        else {
                            onError(xmlhttp.status);
                        }
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
            catch (ex) {
                onError(ex);
            }
        },
        encodeBase64: function OSF_Outil$encodeBase64(input) {
            if (!input)
                return input;
            var codex = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/=";
            var output = [];
            var temp = [];
            var index = 0;
            var c1, c2, c3, a, b, c;
            var i;
            var length = input.length;
            do {
                c1 = input.charCodeAt(index++);
                c2 = input.charCodeAt(index++);
                c3 = input.charCodeAt(index++);
                i = 0;
                a = c1 & 255;
                b = c1 >> 8;
                c = c2 & 255;
                temp[i++] = a >> 2;
                temp[i++] = ((a & 3) << 4) | (b >> 4);
                temp[i++] = ((b & 15) << 2) | (c >> 6);
                temp[i++] = c & 63;
                if (!isNaN(c2)) {
                    a = c2 >> 8;
                    b = c3 & 255;
                    c = c3 >> 8;
                    temp[i++] = a >> 2;
                    temp[i++] = ((a & 3) << 4) | (b >> 4);
                    temp[i++] = ((b & 15) << 2) | (c >> 6);
                    temp[i++] = c & 63;
                }
                if (isNaN(c2)) {
                    temp[i - 1] = 64;
                }
                else if (isNaN(c3)) {
                    temp[i - 2] = 64;
                    temp[i - 1] = 64;
                }
                for (var t = 0; t < i; t++) {
                    output.push(codex.charAt(temp[t]));
                }
            } while (index < length);
            return output.join("");
        },
        getSessionStorage: function OSF_Outil$getSessionStorage() {
            return _getSessionStorage();
        },
        getLocalStorage: function OSF_Outil$getLocalStorage() {
            if (!_safeLocalStorage) {
                try {
                    var localStorage = window.localStorage;
                }
                catch (ex) {
                    localStorage = null;
                }
                _safeLocalStorage = new OfficeExt.SafeStorage(localStorage);
            }
            return _safeLocalStorage;
        },
        convertIntToCssHexColor: function OSF_Outil$convertIntToCssHexColor(val) {
            var hex = "#" + (Number(val) + 0x1000000).toString(16).slice(-6);
            return hex;
        },
        attachClickHandler: function OSF_Outil$attachClickHandler(element, handler) {
            element.onclick = function (e) {
                handler();
            };
            element.ontouchend = function (e) {
                handler();
                e.preventDefault();
            };
        },
        getQueryStringParamValue: function OSF_Outil$getQueryStringParamValue(queryString, paramName) {
            var e = Function._validateParams(arguments, [{ name: "queryString", type: String, mayBeNull: false },
                { name: "paramName", type: String, mayBeNull: false }
            ]);
            if (e) {
                OsfMsAjaxFactory.msAjaxDebug.trace("OSF_Outil_getQueryStringParamValue: Parameters cannot be null.");
                return "";
            }
            var queryExp = new RegExp("[\\?&]" + paramName + "=([^&#]*)", "i");
            if (!queryExp.test(queryString)) {
                OsfMsAjaxFactory.msAjaxDebug.trace("OSF_Outil_getQueryStringParamValue: The parameter is not found.");
                return "";
            }
            return queryExp.exec(queryString)[1];
        },
        isiOS: function OSF_Outil$isiOS() {
            return (window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
        },
        isChrome: function OSF_Outil$isChrome() {
            return (window.navigator.userAgent.indexOf("Chrome") > 0) && !OSF.OUtil.isEdge();
        },
        isEdge: function OSF_Outil$isEdge() {
            return window.navigator.userAgent.indexOf("Edge") > 0;
        },
        isIE: function OSF_Outil$isIE() {
            return window.navigator.userAgent.indexOf("Trident") > 0;
        },
        isFirefox: function OSF_Outil$isFirefox() {
            return window.navigator.userAgent.indexOf("Firefox") > 0;
        },
        shallowCopy: function OSF_Outil$shallowCopy(sourceObj) {
            if (sourceObj == null) {
                return null;
            }
            else if (!(sourceObj instanceof Object)) {
                return sourceObj;
            }
            else if (Array.isArray(sourceObj)) {
                var copyArr = [];
                for (var i = 0; i < sourceObj.length; i++) {
                    copyArr.push(sourceObj[i]);
                }
                return copyArr;
            }
            else {
                var copyObj = sourceObj.constructor();
                for (var property in sourceObj) {
                    if (sourceObj.hasOwnProperty(property)) {
                        copyObj[property] = sourceObj[property];
                    }
                }
                return copyObj;
            }
        },
        createObject: function OSF_Outil$createObject(properties) {
            var obj = null;
            if (properties) {
                obj = {};
                var len = properties.length;
                for (var i = 0; i < len; i++) {
                    obj[properties[i].name] = properties[i].value;
                }
            }
            return obj;
        },
        addClass: function OSF_OUtil$addClass(elmt, val) {
            if (!OSF.OUtil.hasClass(elmt, val)) {
                var className = elmt.getAttribute(_classN);
                if (className) {
                    elmt.setAttribute(_classN, className + " " + val);
                }
                else {
                    elmt.setAttribute(_classN, val);
                }
            }
        },
        removeClass: function OSF_OUtil$removeClass(elmt, val) {
            if (OSF.OUtil.hasClass(elmt, val)) {
                var className = elmt.getAttribute(_classN);
                var reg = new RegExp('(\\s|^)' + val + '(\\s|$)');
                className = className.replace(reg, '');
                elmt.setAttribute(_classN, className);
            }
        },
        hasClass: function OSF_OUtil$hasClass(elmt, clsName) {
            var className = elmt.getAttribute(_classN);
            return className && className.match(new RegExp('(\\s|^)' + clsName + '(\\s|$)'));
        },
        focusToFirstTabbable: function OSF_OUtil$focusToFirstTabbable(all, backward) {
            var next;
            var focused = false;
            var candidate;
            var setFlag = function (e) {
                focused = true;
            };
            var findNextPos = function (allLen, currPos, backward) {
                if (currPos < 0 || currPos > allLen) {
                    return -1;
                }
                else if (currPos === 0 && backward) {
                    return -1;
                }
                else if (currPos === allLen - 1 && !backward) {
                    return -1;
                }
                if (backward) {
                    return currPos - 1;
                }
                else {
                    return currPos + 1;
                }
            };
            all = _reOrderTabbableElements(all);
            next = backward ? all.length - 1 : 0;
            if (all.length === 0) {
                return null;
            }
            while (!focused && next >= 0 && next < all.length) {
                candidate = all[next];
                window.focus();
                candidate.addEventListener('focus', setFlag);
                candidate.focus();
                candidate.removeEventListener('focus', setFlag);
                next = findNextPos(all.length, next, backward);
                if (!focused && candidate === document.activeElement) {
                    focused = true;
                }
            }
            if (focused) {
                return candidate;
            }
            else {
                return null;
            }
        },
        focusToNextTabbable: function OSF_OUtil$focusToNextTabbable(all, curr, shift) {
            var currPos;
            var next;
            var focused = false;
            var candidate;
            var setFlag = function (e) {
                focused = true;
            };
            var findCurrPos = function (all, curr) {
                var i = 0;
                for (; i < all.length; i++) {
                    if (all[i] === curr) {
                        return i;
                    }
                }
                return -1;
            };
            var findNextPos = function (allLen, currPos, shift) {
                if (currPos < 0 || currPos > allLen) {
                    return -1;
                }
                else if (currPos === 0 && shift) {
                    return -1;
                }
                else if (currPos === allLen - 1 && !shift) {
                    return -1;
                }
                if (shift) {
                    return currPos - 1;
                }
                else {
                    return currPos + 1;
                }
            };
            all = _reOrderTabbableElements(all);
            currPos = findCurrPos(all, curr);
            next = findNextPos(all.length, currPos, shift);
            if (next < 0) {
                return null;
            }
            while (!focused && next >= 0 && next < all.length) {
                candidate = all[next];
                candidate.addEventListener('focus', setFlag);
                candidate.focus();
                candidate.removeEventListener('focus', setFlag);
                next = findNextPos(all.length, next, shift);
                if (!focused && candidate === document.activeElement) {
                    focused = true;
                }
            }
            if (focused) {
                return candidate;
            }
            else {
                return null;
            }
        }
    };
})();
OSF.OUtil.Guid = (function () {
    var hexCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    return {
        generateNewGuid: function OSF_Outil_Guid$generateNewGuid() {
            var result = "";
            var tick = (new Date()).getTime();
            var index = 0;
            for (; index < 32 && tick > 0; index++) {
                if (index == 8 || index == 12 || index == 16 || index == 20) {
                    result += "-";
                }
                result += hexCode[tick % 16];
                tick = Math.floor(tick / 16);
            }
            for (; index < 32; index++) {
                if (index == 8 || index == 12 || index == 16 || index == 20) {
                    result += "-";
                }
                result += hexCode[Math.floor(Math.random() * 16)];
            }
            return result;
        }
    };
})();
window.OSF = OSF;
OSF.OUtil.setNamespace("OSF", window);
OSF.MessageIDs = {
    "FetchBundleUrl": 0,
    "LoadReactBundle": 1,
    "LoadBundleSuccess": 2,
    "LoadBundleError": 3
};
OSF.AppName = {
    Unsupported: 0,
    Excel: 1,
    Word: 2,
    PowerPoint: 4,
    Outlook: 8,
    ExcelWebApp: 16,
    WordWebApp: 32,
    OutlookWebApp: 64,
    Project: 128,
    AccessWebApp: 256,
    PowerpointWebApp: 512,
    ExcelIOS: 1024,
    Sway: 2048,
    WordIOS: 4096,
    PowerPointIOS: 8192,
    Access: 16384,
    Lync: 32768,
    OutlookIOS: 65536,
    OneNoteWebApp: 131072,
    OneNote: 262144,
    ExcelWinRT: 524288,
    WordWinRT: 1048576,
    PowerpointWinRT: 2097152,
    OutlookAndroid: 4194304,
    OneNoteWinRT: 8388608,
    ExcelAndroid: 8388609,
    VisioWebApp: 8388610,
    OneNoteIOS: 8388611,
    WordAndroid: 8388613,
    PowerpointAndroid: 8388614,
    Visio: 8388615,
    OneNoteAndroid: 4194305
};
OSF.InternalPerfMarker = {
    DataCoercionBegin: "Agave.HostCall.CoerceDataStart",
    DataCoercionEnd: "Agave.HostCall.CoerceDataEnd"
};
OSF.HostCallPerfMarker = {
    IssueCall: "Agave.HostCall.IssueCall",
    ReceiveResponse: "Agave.HostCall.ReceiveResponse",
    RuntimeExceptionRaised: "Agave.HostCall.RuntimeExecptionRaised"
};
OSF.AgaveHostAction = {
    "Select": 0,
    "UnSelect": 1,
    "CancelDialog": 2,
    "InsertAgave": 3,
    "CtrlF6In": 4,
    "CtrlF6Exit": 5,
    "CtrlF6ExitShift": 6,
    "SelectWithError": 7,
    "NotifyHostError": 8,
    "RefreshAddinCommands": 9,
    "PageIsReady": 10,
    "TabIn": 11,
    "TabInShift": 12,
    "TabExit": 13,
    "TabExitShift": 14,
    "EscExit": 15,
    "F2Exit": 16,
    "ExitNoFocusable": 17,
    "ExitNoFocusableShift": 18,
    "MouseEnter": 19,
    "MouseLeave": 20,
    "UpdateTargetUrl": 21,
    "InstallCustomFunctions": 22,
    "SendTelemetryEvent": 23,
    "UninstallCustomFunctions": 24
};
OSF.SharedConstants = {
    "NotificationConversationIdSuffix": '_ntf'
};
OSF.DialogMessageType = {
    DialogMessageReceived: 0,
    DialogParentMessageReceived: 1,
    DialogClosed: 12006
};
OSF.OfficeAppContext = function OSF_OfficeAppContext(id, appName, appVersion, appUILocale, dataLocale, docUrl, clientMode, settings, reason, osfControlType, eToken, correlationId, appInstanceId, touchEnabled, commerceAllowed, appMinorVersion, requirementMatrix, hostCustomMessage, hostFullVersion, clientWindowHeight, clientWindowWidth, addinName, appDomains, dialogRequirementMatrix, featureGates) {
    this._id = id;
    this._appName = appName;
    this._appVersion = appVersion;
    this._appUILocale = appUILocale;
    this._dataLocale = dataLocale;
    this._docUrl = docUrl;
    this._clientMode = clientMode;
    this._settings = settings;
    this._reason = reason;
    this._osfControlType = osfControlType;
    this._eToken = eToken;
    this._correlationId = correlationId;
    this._appInstanceId = appInstanceId;
    this._touchEnabled = touchEnabled;
    this._commerceAllowed = commerceAllowed;
    this._appMinorVersion = appMinorVersion;
    this._requirementMatrix = requirementMatrix;
    this._hostCustomMessage = hostCustomMessage;
    this._hostFullVersion = hostFullVersion;
    this._isDialog = false;
    this._clientWindowHeight = clientWindowHeight;
    this._clientWindowWidth = clientWindowWidth;
    this._addinName = addinName;
    this._appDomains = appDomains;
    this._dialogRequirementMatrix = dialogRequirementMatrix;
    this._featureGates = featureGates;
    this.get_id = function get_id() { return this._id; };
    this.get_appName = function get_appName() { return this._appName; };
    this.get_appVersion = function get_appVersion() { return this._appVersion; };
    this.get_appUILocale = function get_appUILocale() { return this._appUILocale; };
    this.get_dataLocale = function get_dataLocale() { return this._dataLocale; };
    this.get_docUrl = function get_docUrl() { return this._docUrl; };
    this.get_clientMode = function get_clientMode() { return this._clientMode; };
    this.get_bindings = function get_bindings() { return this._bindings; };
    this.get_settings = function get_settings() { return this._settings; };
    this.get_reason = function get_reason() { return this._reason; };
    this.get_osfControlType = function get_osfControlType() { return this._osfControlType; };
    this.get_eToken = function get_eToken() { return this._eToken; };
    this.get_correlationId = function get_correlationId() { return this._correlationId; };
    this.get_appInstanceId = function get_appInstanceId() { return this._appInstanceId; };
    this.get_touchEnabled = function get_touchEnabled() { return this._touchEnabled; };
    this.get_commerceAllowed = function get_commerceAllowed() { return this._commerceAllowed; };
    this.get_appMinorVersion = function get_appMinorVersion() { return this._appMinorVersion; };
    this.get_requirementMatrix = function get_requirementMatrix() { return this._requirementMatrix; };
    this.get_dialogRequirementMatrix = function get_dialogRequirementMatrix() { return this._dialogRequirementMatrix; };
    this.get_hostCustomMessage = function get_hostCustomMessage() { return this._hostCustomMessage; };
    this.get_hostFullVersion = function get_hostFullVersion() { return this._hostFullVersion; };
    this.get_isDialog = function get_isDialog() { return this._isDialog; };
    this.get_clientWindowHeight = function get_clientWindowHeight() { return this._clientWindowHeight; };
    this.get_clientWindowWidth = function get_clientWindowWidth() { return this._clientWindowWidth; };
    this.get_addinName = function get_addinName() { return this._addinName; };
    this.get_appDomains = function get_appDomains() { return this._appDomains; };
    this.get_featureGates = function get_featureGates() { return this._featureGates; };
};
OSF.OsfControlType = {
    DocumentLevel: 0,
    ContainerLevel: 1
};
OSF.ClientMode = {
    ReadOnly: 0,
    ReadWrite: 1
};
OSF.OUtil.setNamespace("Microsoft", window);
OSF.OUtil.setNamespace("Office", Microsoft);
OSF.OUtil.setNamespace("Client", Microsoft.Office);
OSF.OUtil.setNamespace("WebExtension", Microsoft.Office);
Microsoft.Office.WebExtension.InitializationReason = {
    Inserted: "inserted",
    DocumentOpened: "documentOpened"
};
Microsoft.Office.WebExtension.ValueFormat = {
    Unformatted: "unformatted",
    Formatted: "formatted"
};
Microsoft.Office.WebExtension.FilterType = {
    All: "all"
};
Microsoft.Office.WebExtension.Parameters = {
    BindingType: "bindingType",
    CoercionType: "coercionType",
    ValueFormat: "valueFormat",
    FilterType: "filterType",
    Columns: "columns",
    SampleData: "sampleData",
    GoToType: "goToType",
    SelectionMode: "selectionMode",
    Id: "id",
    PromptText: "promptText",
    ItemName: "itemName",
    FailOnCollision: "failOnCollision",
    StartRow: "startRow",
    StartColumn: "startColumn",
    RowCount: "rowCount",
    ColumnCount: "columnCount",
    Callback: "callback",
    AsyncContext: "asyncContext",
    Data: "data",
    Rows: "rows",
    OverwriteIfStale: "overwriteIfStale",
    FileType: "fileType",
    EventType: "eventType",
    Handler: "handler",
    SliceSize: "sliceSize",
    SliceIndex: "sliceIndex",
    ActiveView: "activeView",
    Status: "status",
    PlatformType: "platformType",
    HostType: "hostType",
    ForceConsent: "forceConsent",
    ForceAddAccount: "forceAddAccount",
    AuthChallenge: "authChallenge",
    Reserved: "reserved",
    Tcid: "tcid",
    Xml: "xml",
    Namespace: "namespace",
    Prefix: "prefix",
    XPath: "xPath",
    Text: "text",
    ImageLeft: "imageLeft",
    ImageTop: "imageTop",
    ImageWidth: "imageWidth",
    ImageHeight: "imageHeight",
    TaskId: "taskId",
    FieldId: "fieldId",
    FieldValue: "fieldValue",
    ServerUrl: "serverUrl",
    ListName: "listName",
    ResourceId: "resourceId",
    ViewType: "viewType",
    ViewName: "viewName",
    GetRawValue: "getRawValue",
    CellFormat: "cellFormat",
    TableOptions: "tableOptions",
    TaskIndex: "taskIndex",
    ResourceIndex: "resourceIndex",
    CustomFieldId: "customFieldId",
    Url: "url",
    MessageHandler: "messageHandler",
    Width: "width",
    Height: "height",
    RequireHTTPs: "requireHTTPS",
    MessageToParent: "messageToParent",
    DisplayInIframe: "displayInIframe",
    MessageContent: "messageContent",
    HideTitle: "hideTitle",
    UseDeviceIndependentPixels: "useDeviceIndependentPixels",
    PromptBeforeOpen: "promptBeforeOpen",
    EnforceAppDomain: "enforceAppDomain",
    AppCommandInvocationCompletedData: "appCommandInvocationCompletedData",
    Base64: "base64",
    FormId: "formId"
};
OSF.OUtil.setNamespace("DDA", OSF);
OSF.DDA.DocumentMode = {
    ReadOnly: 1,
    ReadWrite: 0
};
OSF.DDA.PropertyDescriptors = {
    AsyncResultStatus: "AsyncResultStatus"
};
OSF.DDA.EventDescriptors = {};
OSF.DDA.ListDescriptors = {};
OSF.DDA.UI = {};
OSF.DDA.getXdmEventName = function OSF_DDA$GetXdmEventName(id, eventType) {
    if (eventType == Microsoft.Office.WebExtension.EventType.BindingSelectionChanged ||
        eventType == Microsoft.Office.WebExtension.EventType.BindingDataChanged ||
        eventType == Microsoft.Office.WebExtension.EventType.DataNodeDeleted ||
        eventType == Microsoft.Office.WebExtension.EventType.DataNodeInserted ||
        eventType == Microsoft.Office.WebExtension.EventType.DataNodeReplaced) {
        return id + "_" + eventType;
    }
    else {
        return eventType;
    }
};
OSF.DDA.MethodDispId = {
    dispidMethodMin: 64,
    dispidGetSelectedDataMethod: 64,
    dispidSetSelectedDataMethod: 65,
    dispidAddBindingFromSelectionMethod: 66,
    dispidAddBindingFromPromptMethod: 67,
    dispidGetBindingMethod: 68,
    dispidReleaseBindingMethod: 69,
    dispidGetBindingDataMethod: 70,
    dispidSetBindingDataMethod: 71,
    dispidAddRowsMethod: 72,
    dispidClearAllRowsMethod: 73,
    dispidGetAllBindingsMethod: 74,
    dispidLoadSettingsMethod: 75,
    dispidSaveSettingsMethod: 76,
    dispidGetDocumentCopyMethod: 77,
    dispidAddBindingFromNamedItemMethod: 78,
    dispidAddColumnsMethod: 79,
    dispidGetDocumentCopyChunkMethod: 80,
    dispidReleaseDocumentCopyMethod: 81,
    dispidNavigateToMethod: 82,
    dispidGetActiveViewMethod: 83,
    dispidGetDocumentThemeMethod: 84,
    dispidGetOfficeThemeMethod: 85,
    dispidGetFilePropertiesMethod: 86,
    dispidClearFormatsMethod: 87,
    dispidSetTableOptionsMethod: 88,
    dispidSetFormatsMethod: 89,
    dispidExecuteRichApiRequestMethod: 93,
    dispidAppCommandInvocationCompletedMethod: 94,
    dispidCloseContainerMethod: 97,
    dispidGetAccessTokenMethod: 98,
    dispidGetAuthContextMethod: 99,
    dispidOpenBrowserWindow: 102,
    dispidCreateDocumentMethod: 105,
    dispidInsertFormMethod: 106,
    dispidDisplayRibbonCalloutAsyncMethod: 109,
    dispidGetSelectedTaskMethod: 110,
    dispidGetSelectedResourceMethod: 111,
    dispidGetTaskMethod: 112,
    dispidGetResourceFieldMethod: 113,
    dispidGetWSSUrlMethod: 114,
    dispidGetTaskFieldMethod: 115,
    dispidGetProjectFieldMethod: 116,
    dispidGetSelectedViewMethod: 117,
    dispidGetTaskByIndexMethod: 118,
    dispidGetResourceByIndexMethod: 119,
    dispidSetTaskFieldMethod: 120,
    dispidSetResourceFieldMethod: 121,
    dispidGetMaxTaskIndexMethod: 122,
    dispidGetMaxResourceIndexMethod: 123,
    dispidCreateTaskMethod: 124,
    dispidAddDataPartMethod: 128,
    dispidGetDataPartByIdMethod: 129,
    dispidGetDataPartsByNamespaceMethod: 130,
    dispidGetDataPartXmlMethod: 131,
    dispidGetDataPartNodesMethod: 132,
    dispidDeleteDataPartMethod: 133,
    dispidGetDataNodeValueMethod: 134,
    dispidGetDataNodeXmlMethod: 135,
    dispidGetDataNodesMethod: 136,
    dispidSetDataNodeValueMethod: 137,
    dispidSetDataNodeXmlMethod: 138,
    dispidAddDataNamespaceMethod: 139,
    dispidGetDataUriByPrefixMethod: 140,
    dispidGetDataPrefixByUriMethod: 141,
    dispidGetDataNodeTextMethod: 142,
    dispidSetDataNodeTextMethod: 143,
    dispidMessageParentMethod: 144,
    dispidSendMessageMethod: 145,
    dispidExecuteFeature: 146,
    dispidQueryFeature: 147,
    dispidMethodMax: 147
};
OSF.DDA.EventDispId = {
    dispidEventMin: 0,
    dispidInitializeEvent: 0,
    dispidSettingsChangedEvent: 1,
    dispidDocumentSelectionChangedEvent: 2,
    dispidBindingSelectionChangedEvent: 3,
    dispidBindingDataChangedEvent: 4,
    dispidDocumentOpenEvent: 5,
    dispidDocumentCloseEvent: 6,
    dispidActiveViewChangedEvent: 7,
    dispidDocumentThemeChangedEvent: 8,
    dispidOfficeThemeChangedEvent: 9,
    dispidDialogMessageReceivedEvent: 10,
    dispidDialogNotificationShownInAddinEvent: 11,
    dispidDialogParentMessageReceivedEvent: 12,
    dispidObjectDeletedEvent: 13,
    dispidObjectSelectionChangedEvent: 14,
    dispidObjectDataChangedEvent: 15,
    dispidContentControlAddedEvent: 16,
    dispidActivationStatusChangedEvent: 32,
    dispidRichApiMessageEvent: 33,
    dispidAppCommandInvokedEvent: 39,
    dispidOlkItemSelectedChangedEvent: 46,
    dispidOlkRecipientsChangedEvent: 47,
    dispidOlkAppointmentTimeChangedEvent: 48,
    dispidOlkRecurrenceChangedEvent: 49,
    dispidOlkAttachmentsChangedEvent: 50,
    dispidOlkEnhancedLocationsChangedEvent: 51,
    dispidOlkInfobarClickedEvent: 52,
    dispidTaskSelectionChangedEvent: 56,
    dispidResourceSelectionChangedEvent: 57,
    dispidViewSelectionChangedEvent: 58,
    dispidDataNodeAddedEvent: 60,
    dispidDataNodeReplacedEvent: 61,
    dispidDataNodeDeletedEvent: 62,
    dispidEventMax: 63
};
OSF.DDA.ErrorCodeManager = (function () {
    var _errorMappings = {};
    return {
        getErrorArgs: function OSF_DDA_ErrorCodeManager$getErrorArgs(errorCode) {
            var errorArgs = _errorMappings[errorCode];
            if (!errorArgs) {
                errorArgs = _errorMappings[this.errorCodes.ooeInternalError];
            }
            else {
                if (!errorArgs.name) {
                    errorArgs.name = _errorMappings[this.errorCodes.ooeInternalError].name;
                }
                if (!errorArgs.message) {
                    errorArgs.message = _errorMappings[this.errorCodes.ooeInternalError].message;
                }
            }
            return errorArgs;
        },
        addErrorMessage: function OSF_DDA_ErrorCodeManager$addErrorMessage(errorCode, errorNameMessage) {
            _errorMappings[errorCode] = errorNameMessage;
        },
        errorCodes: {
            ooeSuccess: 0,
            ooeChunkResult: 1,
            ooeCoercionTypeNotSupported: 1000,
            ooeGetSelectionNotMatchDataType: 1001,
            ooeCoercionTypeNotMatchBinding: 1002,
            ooeInvalidGetRowColumnCounts: 1003,
            ooeSelectionNotSupportCoercionType: 1004,
            ooeInvalidGetStartRowColumn: 1005,
            ooeNonUniformPartialGetNotSupported: 1006,
            ooeGetDataIsTooLarge: 1008,
            ooeFileTypeNotSupported: 1009,
            ooeGetDataParametersConflict: 1010,
            ooeInvalidGetColumns: 1011,
            ooeInvalidGetRows: 1012,
            ooeInvalidReadForBlankRow: 1013,
            ooeUnsupportedDataObject: 2000,
            ooeCannotWriteToSelection: 2001,
            ooeDataNotMatchSelection: 2002,
            ooeOverwriteWorksheetData: 2003,
            ooeDataNotMatchBindingSize: 2004,
            ooeInvalidSetStartRowColumn: 2005,
            ooeInvalidDataFormat: 2006,
            ooeDataNotMatchCoercionType: 2007,
            ooeDataNotMatchBindingType: 2008,
            ooeSetDataIsTooLarge: 2009,
            ooeNonUniformPartialSetNotSupported: 2010,
            ooeInvalidSetColumns: 2011,
            ooeInvalidSetRows: 2012,
            ooeSetDataParametersConflict: 2013,
            ooeCellDataAmountBeyondLimits: 2014,
            ooeSelectionCannotBound: 3000,
            ooeBindingNotExist: 3002,
            ooeBindingToMultipleSelection: 3003,
            ooeInvalidSelectionForBindingType: 3004,
            ooeOperationNotSupportedOnThisBindingType: 3005,
            ooeNamedItemNotFound: 3006,
            ooeMultipleNamedItemFound: 3007,
            ooeInvalidNamedItemForBindingType: 3008,
            ooeUnknownBindingType: 3009,
            ooeOperationNotSupportedOnMatrixData: 3010,
            ooeInvalidColumnsForBinding: 3011,
            ooeSettingNameNotExist: 4000,
            ooeSettingsCannotSave: 4001,
            ooeSettingsAreStale: 4002,
            ooeOperationNotSupported: 5000,
            ooeInternalError: 5001,
            ooeDocumentReadOnly: 5002,
            ooeEventHandlerNotExist: 5003,
            ooeInvalidApiCallInContext: 5004,
            ooeShuttingDown: 5005,
            ooeUnsupportedEnumeration: 5007,
            ooeIndexOutOfRange: 5008,
            ooeBrowserAPINotSupported: 5009,
            ooeInvalidParam: 5010,
            ooeRequestTimeout: 5011,
            ooeInvalidOrTimedOutSession: 5012,
            ooeInvalidApiArguments: 5013,
            ooeOperationCancelled: 5014,
            ooeWorkbookHidden: 5015,
            ooeTooManyIncompleteRequests: 5100,
            ooeRequestTokenUnavailable: 5101,
            ooeActivityLimitReached: 5102,
            ooeCustomXmlNodeNotFound: 6000,
            ooeCustomXmlError: 6100,
            ooeCustomXmlExceedQuota: 6101,
            ooeCustomXmlOutOfDate: 6102,
            ooeNoCapability: 7000,
            ooeCannotNavTo: 7001,
            ooeSpecifiedIdNotExist: 7002,
            ooeNavOutOfBound: 7004,
            ooeElementMissing: 8000,
            ooeProtectedError: 8001,
            ooeInvalidCellsValue: 8010,
            ooeInvalidTableOptionValue: 8011,
            ooeInvalidFormatValue: 8012,
            ooeRowIndexOutOfRange: 8020,
            ooeColIndexOutOfRange: 8021,
            ooeFormatValueOutOfRange: 8022,
            ooeCellFormatAmountBeyondLimits: 8023,
            ooeMemoryFileLimit: 11000,
            ooeNetworkProblemRetrieveFile: 11001,
            ooeInvalidSliceSize: 11002,
            ooeInvalidCallback: 11101,
            ooeInvalidWidth: 12000,
            ooeInvalidHeight: 12001,
            ooeNavigationError: 12002,
            ooeInvalidScheme: 12003,
            ooeAppDomains: 12004,
            ooeRequireHTTPS: 12005,
            ooeWebDialogClosed: 12006,
            ooeDialogAlreadyOpened: 12007,
            ooeEndUserAllow: 12008,
            ooeEndUserIgnore: 12009,
            ooeNotUILessDialog: 12010,
            ooeCrossZone: 12011,
            ooeNotSSOAgave: 13000,
            ooeSSOUserNotSignedIn: 13001,
            ooeSSOUserAborted: 13002,
            ooeSSOUnsupportedUserIdentity: 13003,
            ooeSSOInvalidResourceUrl: 13004,
            ooeSSOInvalidGrant: 13005,
            ooeSSOClientError: 13006,
            ooeSSOServerError: 13007,
            ooeAddinIsAlreadyRequestingToken: 13008,
            ooeSSOUserConsentNotSupportedByCurrentAddinCategory: 13009,
            ooeSSOConnectionLost: 13010,
            ooeResourceNotAllowed: 13011,
            ooeSSOUnsupportedPlatform: 13012,
            ooeAccessDenied: 13990,
            ooeGeneralException: 13991
        },
        initializeErrorMessages: function OSF_DDA_ErrorCodeManager$initializeErrorMessages(stringNS) {
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCoercionTypeNotSupported] = { name: stringNS.L_InvalidCoercion, message: stringNS.L_CoercionTypeNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeGetSelectionNotMatchDataType] = { name: stringNS.L_DataReadError, message: stringNS.L_GetSelectionNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCoercionTypeNotMatchBinding] = { name: stringNS.L_InvalidCoercion, message: stringNS.L_CoercionTypeNotMatchBinding };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidGetRowColumnCounts] = { name: stringNS.L_DataReadError, message: stringNS.L_InvalidGetRowColumnCounts };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSelectionNotSupportCoercionType] = { name: stringNS.L_DataReadError, message: stringNS.L_SelectionNotSupportCoercionType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidGetStartRowColumn] = { name: stringNS.L_DataReadError, message: stringNS.L_InvalidGetStartRowColumn };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNonUniformPartialGetNotSupported] = { name: stringNS.L_DataReadError, message: stringNS.L_NonUniformPartialGetNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeGetDataIsTooLarge] = { name: stringNS.L_DataReadError, message: stringNS.L_GetDataIsTooLarge };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeFileTypeNotSupported] = { name: stringNS.L_DataReadError, message: stringNS.L_FileTypeNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeGetDataParametersConflict] = { name: stringNS.L_DataReadError, message: stringNS.L_GetDataParametersConflict };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidGetColumns] = { name: stringNS.L_DataReadError, message: stringNS.L_InvalidGetColumns };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidGetRows] = { name: stringNS.L_DataReadError, message: stringNS.L_InvalidGetRows };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidReadForBlankRow] = { name: stringNS.L_DataReadError, message: stringNS.L_InvalidReadForBlankRow };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeUnsupportedDataObject] = { name: stringNS.L_DataWriteError, message: stringNS.L_UnsupportedDataObject };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCannotWriteToSelection] = { name: stringNS.L_DataWriteError, message: stringNS.L_CannotWriteToSelection };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDataNotMatchSelection] = { name: stringNS.L_DataWriteError, message: stringNS.L_DataNotMatchSelection };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeOverwriteWorksheetData] = { name: stringNS.L_DataWriteError, message: stringNS.L_OverwriteWorksheetData };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDataNotMatchBindingSize] = { name: stringNS.L_DataWriteError, message: stringNS.L_DataNotMatchBindingSize };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidSetStartRowColumn] = { name: stringNS.L_DataWriteError, message: stringNS.L_InvalidSetStartRowColumn };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidDataFormat] = { name: stringNS.L_InvalidFormat, message: stringNS.L_InvalidDataFormat };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDataNotMatchCoercionType] = { name: stringNS.L_InvalidDataObject, message: stringNS.L_DataNotMatchCoercionType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDataNotMatchBindingType] = { name: stringNS.L_InvalidDataObject, message: stringNS.L_DataNotMatchBindingType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSetDataIsTooLarge] = { name: stringNS.L_DataWriteError, message: stringNS.L_SetDataIsTooLarge };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNonUniformPartialSetNotSupported] = { name: stringNS.L_DataWriteError, message: stringNS.L_NonUniformPartialSetNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidSetColumns] = { name: stringNS.L_DataWriteError, message: stringNS.L_InvalidSetColumns };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidSetRows] = { name: stringNS.L_DataWriteError, message: stringNS.L_InvalidSetRows };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSetDataParametersConflict] = { name: stringNS.L_DataWriteError, message: stringNS.L_SetDataParametersConflict };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSelectionCannotBound] = { name: stringNS.L_BindingCreationError, message: stringNS.L_SelectionCannotBound };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeBindingNotExist] = { name: stringNS.L_InvalidBindingError, message: stringNS.L_BindingNotExist };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeBindingToMultipleSelection] = { name: stringNS.L_BindingCreationError, message: stringNS.L_BindingToMultipleSelection };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidSelectionForBindingType] = { name: stringNS.L_BindingCreationError, message: stringNS.L_InvalidSelectionForBindingType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeOperationNotSupportedOnThisBindingType] = { name: stringNS.L_InvalidBindingOperation, message: stringNS.L_OperationNotSupportedOnThisBindingType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNamedItemNotFound] = { name: stringNS.L_BindingCreationError, message: stringNS.L_NamedItemNotFound };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeMultipleNamedItemFound] = { name: stringNS.L_BindingCreationError, message: stringNS.L_MultipleNamedItemFound };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidNamedItemForBindingType] = { name: stringNS.L_BindingCreationError, message: stringNS.L_InvalidNamedItemForBindingType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeUnknownBindingType] = { name: stringNS.L_InvalidBinding, message: stringNS.L_UnknownBindingType };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeOperationNotSupportedOnMatrixData] = { name: stringNS.L_InvalidBindingOperation, message: stringNS.L_OperationNotSupportedOnMatrixData };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidColumnsForBinding] = { name: stringNS.L_InvalidBinding, message: stringNS.L_InvalidColumnsForBinding };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSettingNameNotExist] = { name: stringNS.L_ReadSettingsError, message: stringNS.L_SettingNameNotExist };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSettingsCannotSave] = { name: stringNS.L_SaveSettingsError, message: stringNS.L_SettingsCannotSave };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSettingsAreStale] = { name: stringNS.L_SettingsStaleError, message: stringNS.L_SettingsAreStale };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeOperationNotSupported] = { name: stringNS.L_HostError, message: stringNS.L_OperationNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError] = { name: stringNS.L_InternalError, message: stringNS.L_InternalErrorDescription };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDocumentReadOnly] = { name: stringNS.L_PermissionDenied, message: stringNS.L_DocumentReadOnly };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerNotExist] = { name: stringNS.L_EventRegistrationError, message: stringNS.L_EventHandlerNotExist };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidApiCallInContext] = { name: stringNS.L_InvalidAPICall, message: stringNS.L_InvalidApiCallInContext };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeShuttingDown] = { name: stringNS.L_ShuttingDown, message: stringNS.L_ShuttingDown };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeUnsupportedEnumeration] = { name: stringNS.L_UnsupportedEnumeration, message: stringNS.L_UnsupportedEnumerationMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeIndexOutOfRange] = { name: stringNS.L_IndexOutOfRange, message: stringNS.L_IndexOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeBrowserAPINotSupported] = { name: stringNS.L_APINotSupported, message: stringNS.L_BrowserAPINotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeRequestTimeout] = { name: stringNS.L_APICallFailed, message: stringNS.L_RequestTimeout };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidOrTimedOutSession] = { name: stringNS.L_InvalidOrTimedOutSession, message: stringNS.L_InvalidOrTimedOutSessionMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeTooManyIncompleteRequests] = { name: stringNS.L_APICallFailed, message: stringNS.L_TooManyIncompleteRequests };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeRequestTokenUnavailable] = { name: stringNS.L_APICallFailed, message: stringNS.L_RequestTokenUnavailable };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeActivityLimitReached] = { name: stringNS.L_APICallFailed, message: stringNS.L_ActivityLimitReached };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidApiArguments] = { name: stringNS.L_APICallFailed, message: stringNS.L_InvalidApiArgumentsMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeWorkbookHidden] = { name: stringNS.L_APICallFailed, message: stringNS.L_WorkbookHiddenMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCustomXmlNodeNotFound] = { name: stringNS.L_InvalidNode, message: stringNS.L_CustomXmlNodeNotFound };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCustomXmlError] = { name: stringNS.L_CustomXmlError, message: stringNS.L_CustomXmlError };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCustomXmlExceedQuota] = { name: stringNS.L_CustomXmlExceedQuotaName, message: stringNS.L_CustomXmlExceedQuotaMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCustomXmlOutOfDate] = { name: stringNS.L_CustomXmlOutOfDateName, message: stringNS.L_CustomXmlOutOfDateMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNoCapability] = { name: stringNS.L_PermissionDenied, message: stringNS.L_NoCapability };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCannotNavTo] = { name: stringNS.L_CannotNavigateTo, message: stringNS.L_CannotNavigateTo };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSpecifiedIdNotExist] = { name: stringNS.L_SpecifiedIdNotExist, message: stringNS.L_SpecifiedIdNotExist };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNavOutOfBound] = { name: stringNS.L_NavOutOfBound, message: stringNS.L_NavOutOfBound };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCellDataAmountBeyondLimits] = { name: stringNS.L_DataWriteReminder, message: stringNS.L_CellDataAmountBeyondLimits };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeElementMissing] = { name: stringNS.L_MissingParameter, message: stringNS.L_ElementMissing };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeProtectedError] = { name: stringNS.L_PermissionDenied, message: stringNS.L_NoCapability };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidCellsValue] = { name: stringNS.L_InvalidValue, message: stringNS.L_InvalidCellsValue };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidTableOptionValue] = { name: stringNS.L_InvalidValue, message: stringNS.L_InvalidTableOptionValue };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidFormatValue] = { name: stringNS.L_InvalidValue, message: stringNS.L_InvalidFormatValue };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeRowIndexOutOfRange] = { name: stringNS.L_OutOfRange, message: stringNS.L_RowIndexOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeColIndexOutOfRange] = { name: stringNS.L_OutOfRange, message: stringNS.L_ColIndexOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeFormatValueOutOfRange] = { name: stringNS.L_OutOfRange, message: stringNS.L_FormatValueOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCellFormatAmountBeyondLimits] = { name: stringNS.L_FormattingReminder, message: stringNS.L_CellFormatAmountBeyondLimits };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeMemoryFileLimit] = { name: stringNS.L_MemoryLimit, message: stringNS.L_CloseFileBeforeRetrieve };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNetworkProblemRetrieveFile] = { name: stringNS.L_NetworkProblem, message: stringNS.L_NetworkProblemRetrieveFile };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidSliceSize] = { name: stringNS.L_InvalidValue, message: stringNS.L_SliceSizeNotSupported };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeDialogAlreadyOpened] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_DialogAlreadyOpened };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidWidth] = { name: stringNS.L_IndexOutOfRange, message: stringNS.L_IndexOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidHeight] = { name: stringNS.L_IndexOutOfRange, message: stringNS.L_IndexOutOfRange };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNavigationError] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_NetworkProblem };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidScheme] = { name: stringNS.L_DialogNavigateError, message: stringNS.L_DialogInvalidScheme };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeAppDomains] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_DialogAddressNotTrusted };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeRequireHTTPS] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_DialogRequireHTTPS };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeEndUserIgnore] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_UserClickIgnore };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeCrossZone] = { name: stringNS.L_DisplayDialogError, message: stringNS.L_NewWindowCrossZoneErrorString };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeNotSSOAgave] = { name: stringNS.L_APINotSupported, message: stringNS.L_InvalidSSOAddinMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOUserNotSignedIn] = { name: stringNS.L_UserNotSignedIn, message: stringNS.L_UserNotSignedIn };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOUserAborted] = { name: stringNS.L_UserAborted, message: stringNS.L_UserAbortedMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOUnsupportedUserIdentity] = { name: stringNS.L_UnsupportedUserIdentity, message: stringNS.L_UnsupportedUserIdentityMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOInvalidResourceUrl] = { name: stringNS.L_InvalidResourceUrl, message: stringNS.L_InvalidResourceUrlMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOInvalidGrant] = { name: stringNS.L_InvalidGrant, message: stringNS.L_InvalidGrantMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOClientError] = { name: stringNS.L_SSOClientError, message: stringNS.L_SSOClientErrorMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOServerError] = { name: stringNS.L_SSOServerError, message: stringNS.L_SSOServerErrorMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeAddinIsAlreadyRequestingToken] = { name: stringNS.L_AddinIsAlreadyRequestingToken, message: stringNS.L_AddinIsAlreadyRequestingTokenMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOUserConsentNotSupportedByCurrentAddinCategory] = { name: stringNS.L_SSOUserConsentNotSupportedByCurrentAddinCategory, message: stringNS.L_SSOUserConsentNotSupportedByCurrentAddinCategoryMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOConnectionLost] = { name: stringNS.L_SSOConnectionLostError, message: stringNS.L_SSOConnectionLostErrorMessage };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeSSOUnsupportedPlatform] = { name: stringNS.L_SSOConnectionLostError, message: stringNS.L_SSOUnsupportedPlatform };
            _errorMappings[OSF.DDA.ErrorCodeManager.errorCodes.ooeOperationCancelled] = { name: stringNS.L_OperationCancelledError, message: stringNS.L_OperationCancelledErrorMessage };
        }
    };
})();
var OfficeExt;
(function (OfficeExt) {
    var Requirement;
    (function (Requirement) {
        var RequirementVersion = (function () {
            function RequirementVersion() {
            }
            return RequirementVersion;
        })();
        Requirement.RequirementVersion = RequirementVersion;
        var RequirementMatrix = (function () {
            function RequirementMatrix(_setMap) {
                this.isSetSupported = function _isSetSupported(name, minVersion) {
                    if (name == undefined) {
                        return false;
                    }
                    if (minVersion == undefined) {
                        minVersion = 0;
                    }
                    var setSupportArray = this._setMap;
                    var sets = setSupportArray._sets;
                    if (sets.hasOwnProperty(name.toLowerCase())) {
                        var setMaxVersion = sets[name.toLowerCase()];
                        try {
                            var setMaxVersionNum = this._getVersion(setMaxVersion);
                            minVersion = minVersion + "";
                            var minVersionNum = this._getVersion(minVersion);
                            if (setMaxVersionNum.major > 0 && setMaxVersionNum.major > minVersionNum.major) {
                                return true;
                            }
                            if (setMaxVersionNum.major > 0 &&
                                setMaxVersionNum.minor >= 0 &&
                                setMaxVersionNum.major == minVersionNum.major &&
                                setMaxVersionNum.minor >= minVersionNum.minor) {
                                return true;
                            }
                        }
                        catch (e) {
                            return false;
                        }
                    }
                    return false;
                };
                this._getVersion = function (version) {
                    version = version + "";
                    var temp = version.split(".");
                    var major = 0;
                    var minor = 0;
                    if (temp.length < 2 && isNaN(Number(version))) {
                        throw "version format incorrect";
                    }
                    else {
                        major = Number(temp[0]);
                        if (temp.length >= 2) {
                            minor = Number(temp[1]);
                        }
                        if (isNaN(major) || isNaN(minor)) {
                            throw "version format incorrect";
                        }
                    }
                    var result = { "minor": minor, "major": major };
                    return result;
                };
                this._setMap = _setMap;
                this.isSetSupported = this.isSetSupported.bind(this);
            }
            return RequirementMatrix;
        })();
        Requirement.RequirementMatrix = RequirementMatrix;
        var DefaultSetRequirement = (function () {
            function DefaultSetRequirement(setMap) {
                this._addSetMap = function DefaultSetRequirement_addSetMap(addedSet) {
                    for (var name in addedSet) {
                        this._sets[name] = addedSet[name];
                    }
                };
                this._sets = setMap;
            }
            return DefaultSetRequirement;
        })();
        Requirement.DefaultSetRequirement = DefaultSetRequirement;
        var DefaultDialogSetRequirement = (function (_super) {
            __extends(DefaultDialogSetRequirement, _super);
            function DefaultDialogSetRequirement() {
                _super.call(this, {
                    "dialogapi": 1.1
                });
            }
            return DefaultDialogSetRequirement;
        })(DefaultSetRequirement);
        Requirement.DefaultDialogSetRequirement = DefaultDialogSetRequirement;
        var ExcelClientDefaultSetRequirement = (function (_super) {
            __extends(ExcelClientDefaultSetRequirement, _super);
            function ExcelClientDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "documentevents": 1.1,
                    "excelapi": 1.1,
                    "matrixbindings": 1.1,
                    "matrixcoercion": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1,
                    "textbindings": 1.1,
                    "textcoercion": 1.1
                });
            }
            return ExcelClientDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.ExcelClientDefaultSetRequirement = ExcelClientDefaultSetRequirement;
        var ExcelClientV1DefaultSetRequirement = (function (_super) {
            __extends(ExcelClientV1DefaultSetRequirement, _super);
            function ExcelClientV1DefaultSetRequirement() {
                _super.call(this);
                this._addSetMap({
                    "imagecoercion": 1.1
                });
            }
            return ExcelClientV1DefaultSetRequirement;
        })(ExcelClientDefaultSetRequirement);
        Requirement.ExcelClientV1DefaultSetRequirement = ExcelClientV1DefaultSetRequirement;
        var OutlookClientDefaultSetRequirement = (function (_super) {
            __extends(OutlookClientDefaultSetRequirement, _super);
            function OutlookClientDefaultSetRequirement() {
                _super.call(this, {
                    "mailbox": 1.3
                });
            }
            return OutlookClientDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.OutlookClientDefaultSetRequirement = OutlookClientDefaultSetRequirement;
        var WordClientDefaultSetRequirement = (function (_super) {
            __extends(WordClientDefaultSetRequirement, _super);
            function WordClientDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "compressedfile": 1.1,
                    "customxmlparts": 1.1,
                    "documentevents": 1.1,
                    "file": 1.1,
                    "htmlcoercion": 1.1,
                    "matrixbindings": 1.1,
                    "matrixcoercion": 1.1,
                    "ooxmlcoercion": 1.1,
                    "pdffile": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1,
                    "textbindings": 1.1,
                    "textcoercion": 1.1,
                    "textfile": 1.1,
                    "wordapi": 1.1
                });
            }
            return WordClientDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.WordClientDefaultSetRequirement = WordClientDefaultSetRequirement;
        var WordClientV1DefaultSetRequirement = (function (_super) {
            __extends(WordClientV1DefaultSetRequirement, _super);
            function WordClientV1DefaultSetRequirement() {
                _super.call(this);
                this._addSetMap({
                    "customxmlparts": 1.2,
                    "wordapi": 1.2,
                    "imagecoercion": 1.1
                });
            }
            return WordClientV1DefaultSetRequirement;
        })(WordClientDefaultSetRequirement);
        Requirement.WordClientV1DefaultSetRequirement = WordClientV1DefaultSetRequirement;
        var PowerpointClientDefaultSetRequirement = (function (_super) {
            __extends(PowerpointClientDefaultSetRequirement, _super);
            function PowerpointClientDefaultSetRequirement() {
                _super.call(this, {
                    "activeview": 1.1,
                    "compressedfile": 1.1,
                    "documentevents": 1.1,
                    "file": 1.1,
                    "pdffile": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "textcoercion": 1.1
                });
            }
            return PowerpointClientDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.PowerpointClientDefaultSetRequirement = PowerpointClientDefaultSetRequirement;
        var PowerpointClientV1DefaultSetRequirement = (function (_super) {
            __extends(PowerpointClientV1DefaultSetRequirement, _super);
            function PowerpointClientV1DefaultSetRequirement() {
                _super.call(this);
                this._addSetMap({
                    "imagecoercion": 1.1
                });
            }
            return PowerpointClientV1DefaultSetRequirement;
        })(PowerpointClientDefaultSetRequirement);
        Requirement.PowerpointClientV1DefaultSetRequirement = PowerpointClientV1DefaultSetRequirement;
        var ProjectClientDefaultSetRequirement = (function (_super) {
            __extends(ProjectClientDefaultSetRequirement, _super);
            function ProjectClientDefaultSetRequirement() {
                _super.call(this, {
                    "selection": 1.1,
                    "textcoercion": 1.1
                });
            }
            return ProjectClientDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.ProjectClientDefaultSetRequirement = ProjectClientDefaultSetRequirement;
        var ExcelWebDefaultSetRequirement = (function (_super) {
            __extends(ExcelWebDefaultSetRequirement, _super);
            function ExcelWebDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "documentevents": 1.1,
                    "matrixbindings": 1.1,
                    "matrixcoercion": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1,
                    "textbindings": 1.1,
                    "textcoercion": 1.1,
                    "file": 1.1
                });
            }
            return ExcelWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.ExcelWebDefaultSetRequirement = ExcelWebDefaultSetRequirement;
        var WordWebDefaultSetRequirement = (function (_super) {
            __extends(WordWebDefaultSetRequirement, _super);
            function WordWebDefaultSetRequirement() {
                _super.call(this, {
                    "compressedfile": 1.1,
                    "documentevents": 1.1,
                    "file": 1.1,
                    "imagecoercion": 1.1,
                    "matrixcoercion": 1.1,
                    "ooxmlcoercion": 1.1,
                    "pdffile": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablecoercion": 1.1,
                    "textcoercion": 1.1,
                    "textfile": 1.1
                });
            }
            return WordWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.WordWebDefaultSetRequirement = WordWebDefaultSetRequirement;
        var PowerpointWebDefaultSetRequirement = (function (_super) {
            __extends(PowerpointWebDefaultSetRequirement, _super);
            function PowerpointWebDefaultSetRequirement() {
                _super.call(this, {
                    "activeview": 1.1,
                    "settings": 1.1
                });
            }
            return PowerpointWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.PowerpointWebDefaultSetRequirement = PowerpointWebDefaultSetRequirement;
        var OutlookWebDefaultSetRequirement = (function (_super) {
            __extends(OutlookWebDefaultSetRequirement, _super);
            function OutlookWebDefaultSetRequirement() {
                _super.call(this, {
                    "mailbox": 1.3
                });
            }
            return OutlookWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.OutlookWebDefaultSetRequirement = OutlookWebDefaultSetRequirement;
        var SwayWebDefaultSetRequirement = (function (_super) {
            __extends(SwayWebDefaultSetRequirement, _super);
            function SwayWebDefaultSetRequirement() {
                _super.call(this, {
                    "activeview": 1.1,
                    "documentevents": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "textcoercion": 1.1
                });
            }
            return SwayWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.SwayWebDefaultSetRequirement = SwayWebDefaultSetRequirement;
        var AccessWebDefaultSetRequirement = (function (_super) {
            __extends(AccessWebDefaultSetRequirement, _super);
            function AccessWebDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "partialtablebindings": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1
                });
            }
            return AccessWebDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.AccessWebDefaultSetRequirement = AccessWebDefaultSetRequirement;
        var ExcelIOSDefaultSetRequirement = (function (_super) {
            __extends(ExcelIOSDefaultSetRequirement, _super);
            function ExcelIOSDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "documentevents": 1.1,
                    "matrixbindings": 1.1,
                    "matrixcoercion": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1,
                    "textbindings": 1.1,
                    "textcoercion": 1.1
                });
            }
            return ExcelIOSDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.ExcelIOSDefaultSetRequirement = ExcelIOSDefaultSetRequirement;
        var WordIOSDefaultSetRequirement = (function (_super) {
            __extends(WordIOSDefaultSetRequirement, _super);
            function WordIOSDefaultSetRequirement() {
                _super.call(this, {
                    "bindingevents": 1.1,
                    "compressedfile": 1.1,
                    "customxmlparts": 1.1,
                    "documentevents": 1.1,
                    "file": 1.1,
                    "htmlcoercion": 1.1,
                    "matrixbindings": 1.1,
                    "matrixcoercion": 1.1,
                    "ooxmlcoercion": 1.1,
                    "pdffile": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "tablebindings": 1.1,
                    "tablecoercion": 1.1,
                    "textbindings": 1.1,
                    "textcoercion": 1.1,
                    "textfile": 1.1
                });
            }
            return WordIOSDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.WordIOSDefaultSetRequirement = WordIOSDefaultSetRequirement;
        var WordIOSV1DefaultSetRequirement = (function (_super) {
            __extends(WordIOSV1DefaultSetRequirement, _super);
            function WordIOSV1DefaultSetRequirement() {
                _super.call(this);
                this._addSetMap({
                    "customxmlparts": 1.2,
                    "wordapi": 1.2
                });
            }
            return WordIOSV1DefaultSetRequirement;
        })(WordIOSDefaultSetRequirement);
        Requirement.WordIOSV1DefaultSetRequirement = WordIOSV1DefaultSetRequirement;
        var PowerpointIOSDefaultSetRequirement = (function (_super) {
            __extends(PowerpointIOSDefaultSetRequirement, _super);
            function PowerpointIOSDefaultSetRequirement() {
                _super.call(this, {
                    "activeview": 1.1,
                    "compressedfile": 1.1,
                    "documentevents": 1.1,
                    "file": 1.1,
                    "pdffile": 1.1,
                    "selection": 1.1,
                    "settings": 1.1,
                    "textcoercion": 1.1
                });
            }
            return PowerpointIOSDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.PowerpointIOSDefaultSetRequirement = PowerpointIOSDefaultSetRequirement;
        var OutlookIOSDefaultSetRequirement = (function (_super) {
            __extends(OutlookIOSDefaultSetRequirement, _super);
            function OutlookIOSDefaultSetRequirement() {
                _super.call(this, {
                    "mailbox": 1.1
                });
            }
            return OutlookIOSDefaultSetRequirement;
        })(DefaultSetRequirement);
        Requirement.OutlookIOSDefaultSetRequirement = OutlookIOSDefaultSetRequirement;
        var RequirementsMatrixFactory = (function () {
            function RequirementsMatrixFactory() {
            }
            RequirementsMatrixFactory.initializeOsfDda = function () {
                OSF.OUtil.setNamespace("Requirement", OSF.DDA);
            };
            RequirementsMatrixFactory.getDefaultRequirementMatrix = function (appContext) {
                this.initializeDefaultSetMatrix();
                var defaultRequirementMatrix = undefined;
                var clientRequirement = appContext.get_requirementMatrix();
                if (clientRequirement != undefined && clientRequirement.length > 0 && typeof (JSON) !== "undefined") {
                    var matrixItem = JSON.parse(appContext.get_requirementMatrix().toLowerCase());
                    defaultRequirementMatrix = new RequirementMatrix(new DefaultSetRequirement(matrixItem));
                }
                else {
                    var appLocator = RequirementsMatrixFactory.getClientFullVersionString(appContext);
                    if (RequirementsMatrixFactory.DefaultSetArrayMatrix != undefined && RequirementsMatrixFactory.DefaultSetArrayMatrix[appLocator] != undefined) {
                        defaultRequirementMatrix = new RequirementMatrix(RequirementsMatrixFactory.DefaultSetArrayMatrix[appLocator]);
                    }
                    else {
                        defaultRequirementMatrix = new RequirementMatrix(new DefaultSetRequirement({}));
                    }
                }
                return defaultRequirementMatrix;
            };
            RequirementsMatrixFactory.getDefaultDialogRequirementMatrix = function (appContext) {
                var defaultRequirementMatrix = undefined;
                var clientRequirement = appContext.get_dialogRequirementMatrix();
                if (clientRequirement != undefined && clientRequirement.length > 0 && typeof (JSON) !== "undefined") {
                    var matrixItem = JSON.parse(appContext.get_requirementMatrix().toLowerCase());
                    defaultRequirementMatrix = new RequirementMatrix(new DefaultSetRequirement(matrixItem));
                }
                else {
                    defaultRequirementMatrix = new RequirementMatrix(new DefaultDialogSetRequirement());
                }
                return defaultRequirementMatrix;
            };
            RequirementsMatrixFactory.getClientFullVersionString = function (appContext) {
                var appMinorVersion = appContext.get_appMinorVersion();
                var appMinorVersionString = "";
                var appFullVersion = "";
                var appName = appContext.get_appName();
                var isIOSClient = appName == 1024 ||
                    appName == 4096 ||
                    appName == 8192 ||
                    appName == 65536;
                if (isIOSClient && appContext.get_appVersion() == 1) {
                    if (appName == 4096 && appMinorVersion >= 15) {
                        appFullVersion = "16.00.01";
                    }
                    else {
                        appFullVersion = "16.00";
                    }
                }
                else if (appContext.get_appName() == 64) {
                    appFullVersion = appContext.get_appVersion();
                }
                else {
                    if (appMinorVersion < 10) {
                        appMinorVersionString = "0" + appMinorVersion;
                    }
                    else {
                        appMinorVersionString = "" + appMinorVersion;
                    }
                    appFullVersion = appContext.get_appVersion() + "." + appMinorVersionString;
                }
                return appContext.get_appName() + "-" + appFullVersion;
            };
            RequirementsMatrixFactory.initializeDefaultSetMatrix = function () {
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Excel_RCLIENT_1600] = new ExcelClientDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Word_RCLIENT_1600] = new WordClientDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.PowerPoint_RCLIENT_1600] = new PowerpointClientDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Excel_RCLIENT_1601] = new ExcelClientV1DefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Word_RCLIENT_1601] = new WordClientV1DefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.PowerPoint_RCLIENT_1601] = new PowerpointClientV1DefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Outlook_RCLIENT_1600] = new OutlookClientDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Excel_WAC_1600] = new ExcelWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Word_WAC_1600] = new WordWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Outlook_WAC_1600] = new OutlookWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Outlook_WAC_1601] = new OutlookWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Project_RCLIENT_1600] = new ProjectClientDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Access_WAC_1600] = new AccessWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.PowerPoint_WAC_1600] = new PowerpointWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Excel_IOS_1600] = new ExcelIOSDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.SWAY_WAC_1600] = new SwayWebDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Word_IOS_1600] = new WordIOSDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Word_IOS_16001] = new WordIOSV1DefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.PowerPoint_IOS_1600] = new PowerpointIOSDefaultSetRequirement();
                RequirementsMatrixFactory.DefaultSetArrayMatrix[RequirementsMatrixFactory.Outlook_IOS_1600] = new OutlookIOSDefaultSetRequirement();
            };
            RequirementsMatrixFactory.Excel_RCLIENT_1600 = "1-16.00";
            RequirementsMatrixFactory.Excel_RCLIENT_1601 = "1-16.01";
            RequirementsMatrixFactory.Word_RCLIENT_1600 = "2-16.00";
            RequirementsMatrixFactory.Word_RCLIENT_1601 = "2-16.01";
            RequirementsMatrixFactory.PowerPoint_RCLIENT_1600 = "4-16.00";
            RequirementsMatrixFactory.PowerPoint_RCLIENT_1601 = "4-16.01";
            RequirementsMatrixFactory.Outlook_RCLIENT_1600 = "8-16.00";
            RequirementsMatrixFactory.Excel_WAC_1600 = "16-16.00";
            RequirementsMatrixFactory.Word_WAC_1600 = "32-16.00";
            RequirementsMatrixFactory.Outlook_WAC_1600 = "64-16.00";
            RequirementsMatrixFactory.Outlook_WAC_1601 = "64-16.01";
            RequirementsMatrixFactory.Project_RCLIENT_1600 = "128-16.00";
            RequirementsMatrixFactory.Access_WAC_1600 = "256-16.00";
            RequirementsMatrixFactory.PowerPoint_WAC_1600 = "512-16.00";
            RequirementsMatrixFactory.Excel_IOS_1600 = "1024-16.00";
            RequirementsMatrixFactory.SWAY_WAC_1600 = "2048-16.00";
            RequirementsMatrixFactory.Word_IOS_1600 = "4096-16.00";
            RequirementsMatrixFactory.Word_IOS_16001 = "4096-16.00.01";
            RequirementsMatrixFactory.PowerPoint_IOS_1600 = "8192-16.00";
            RequirementsMatrixFactory.Outlook_IOS_1600 = "65536-16.00";
            RequirementsMatrixFactory.DefaultSetArrayMatrix = {};
            return RequirementsMatrixFactory;
        })();
        Requirement.RequirementsMatrixFactory = RequirementsMatrixFactory;
    })(Requirement = OfficeExt.Requirement || (OfficeExt.Requirement = {}));
})(OfficeExt || (OfficeExt = {}));
OfficeExt.Requirement.RequirementsMatrixFactory.initializeOsfDda();
Microsoft.Office.WebExtension.ApplicationMode = {
    WebEditor: "webEditor",
    WebViewer: "webViewer",
    Client: "client"
};
Microsoft.Office.WebExtension.DocumentMode = {
    ReadOnly: "readOnly",
    ReadWrite: "readWrite"
};
OSF.NamespaceManager = (function OSF_NamespaceManager() {
    var _userOffice;
    var _useShortcut = false;
    return {
        enableShortcut: function OSF_NamespaceManager$enableShortcut() {
            if (!_useShortcut) {
                if (window.Office) {
                    _userOffice = window.Office;
                }
                else {
                    OSF.OUtil.setNamespace("Office", window);
                }
                window.Office = Microsoft.Office.WebExtension;
                _useShortcut = true;
            }
        },
        disableShortcut: function OSF_NamespaceManager$disableShortcut() {
            if (_useShortcut) {
                if (_userOffice) {
                    window.Office = _userOffice;
                }
                else {
                    OSF.OUtil.unsetNamespace("Office", window);
                }
                _useShortcut = false;
            }
        }
    };
})();
OSF.NamespaceManager.enableShortcut();
Microsoft.Office.WebExtension.useShortNamespace = function Microsoft_Office_WebExtension_useShortNamespace(useShortcut) {
    if (useShortcut) {
        OSF.NamespaceManager.enableShortcut();
    }
    else {
        OSF.NamespaceManager.disableShortcut();
    }
};
Microsoft.Office.WebExtension.select = function Microsoft_Office_WebExtension_select(str, errorCallback) {
    var promise;
    if (str && typeof str == "string") {
        var index = str.indexOf("#");
        if (index != -1) {
            var op = str.substring(0, index);
            var target = str.substring(index + 1);
            switch (op) {
                case "binding":
                case "bindings":
                    if (target) {
                        promise = new OSF.DDA.BindingPromise(target);
                    }
                    break;
            }
        }
    }
    if (!promise) {
        if (errorCallback) {
            var callbackType = typeof errorCallback;
            if (callbackType == "function") {
                var callArgs = {};
                callArgs[Microsoft.Office.WebExtension.Parameters.Callback] = errorCallback;
                OSF.DDA.issueAsyncResult(callArgs, OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidApiCallInContext, OSF.DDA.ErrorCodeManager.getErrorArgs(OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidApiCallInContext));
            }
            else {
                throw OSF.OUtil.formatString(Strings.OfficeOM.L_CallbackNotAFunction, callbackType);
            }
        }
    }
    else {
        promise.onFail = errorCallback;
        return promise;
    }
};
OSF.DDA.Context = function OSF_DDA_Context(officeAppContext, document, license, appOM, getOfficeTheme) {
    OSF.OUtil.defineEnumerableProperties(this, {
        "contentLanguage": {
            value: officeAppContext.get_dataLocale()
        },
        "displayLanguage": {
            value: officeAppContext.get_appUILocale()
        },
        "touchEnabled": {
            value: officeAppContext.get_touchEnabled()
        },
        "commerceAllowed": {
            value: officeAppContext.get_commerceAllowed()
        },
        "host": {
            value: OfficeExt.HostName.Host.getInstance().getHost()
        },
        "platform": {
            value: OfficeExt.HostName.Host.getInstance().getPlatform()
        },
        "isDialog": {
            value: OSF._OfficeAppFactory.getHostInfo().isDialog
        },
        "diagnostics": {
            value: OfficeExt.HostName.Host.getInstance().getDiagnostics(officeAppContext.get_hostFullVersion())
        }
    });
    if (license) {
        OSF.OUtil.defineEnumerableProperty(this, "license", {
            value: license
        });
    }
    if (officeAppContext.ui) {
        OSF.OUtil.defineEnumerableProperty(this, "ui", {
            value: officeAppContext.ui
        });
    }
    if (officeAppContext.auth) {
        OSF.OUtil.defineEnumerableProperty(this, "auth", {
            value: officeAppContext.auth
        });
    }
    if (officeAppContext.webAuth) {
        OSF.OUtil.defineEnumerableProperty(this, "webAuth", {
            value: officeAppContext.webAuth
        });
    }
    if (officeAppContext.application) {
        OSF.OUtil.defineEnumerableProperty(this, "application", {
            value: officeAppContext.application
        });
    }
    if (officeAppContext.get_isDialog()) {
        var requirements = OfficeExt.Requirement.RequirementsMatrixFactory.getDefaultDialogRequirementMatrix(officeAppContext);
        OSF.OUtil.defineEnumerableProperty(this, "requirements", {
            value: requirements
        });
    }
    else {
        if (document) {
            OSF.OUtil.defineEnumerableProperty(this, "document", {
                value: document
            });
        }
        if (appOM) {
            var displayName = appOM.displayName || "appOM";
            delete appOM.displayName;
            OSF.OUtil.defineEnumerableProperty(this, displayName, {
                value: appOM
            });
        }
        if (getOfficeTheme) {
            OSF.OUtil.defineEnumerableProperty(this, "officeTheme", {
                get: function () {
                    return getOfficeTheme();
                }
            });
        }
        var requirements = OfficeExt.Requirement.RequirementsMatrixFactory.getDefaultRequirementMatrix(officeAppContext);
        OSF.OUtil.defineEnumerableProperty(this, "requirements", {
            value: requirements
        });
    }
};
OSF.DDA.OutlookContext = function OSF_DDA_OutlookContext(appContext, settings, license, appOM, getOfficeTheme) {
    OSF.DDA.OutlookContext.uber.constructor.call(this, appContext, null, license, appOM, getOfficeTheme);
    if (settings) {
        OSF.OUtil.defineEnumerableProperty(this, "roamingSettings", {
            value: settings
        });
    }
};
OSF.OUtil.extend(OSF.DDA.OutlookContext, OSF.DDA.Context);
OSF.DDA.OutlookAppOm = function OSF_DDA_OutlookAppOm(appContext, window, appReady) { };
OSF.DDA.Application = function OSF_DDA_Application(officeAppContext) {
};
OSF.DDA.Document = function OSF_DDA_Document(officeAppContext, settings) {
    var mode;
    switch (officeAppContext.get_clientMode()) {
        case OSF.ClientMode.ReadOnly:
            mode = Microsoft.Office.WebExtension.DocumentMode.ReadOnly;
            break;
        case OSF.ClientMode.ReadWrite:
            mode = Microsoft.Office.WebExtension.DocumentMode.ReadWrite;
            break;
    }
    ;
    if (settings) {
        OSF.OUtil.defineEnumerableProperty(this, "settings", {
            value: settings
        });
    }
    ;
    OSF.OUtil.defineMutableProperties(this, {
        "mode": {
            value: mode
        },
        "url": {
            value: officeAppContext.get_docUrl()
        }
    });
};
OSF.DDA.JsomDocument = function OSF_DDA_JsomDocument(officeAppContext, bindingFacade, settings) {
    OSF.DDA.JsomDocument.uber.constructor.call(this, officeAppContext, settings);
    if (bindingFacade) {
        OSF.OUtil.defineEnumerableProperty(this, "bindings", {
            get: function OSF_DDA_Document$GetBindings() { return bindingFacade; }
        });
    }
    var am = OSF.DDA.AsyncMethodNames;
    OSF.DDA.DispIdHost.addAsyncMethods(this, [
        am.GetSelectedDataAsync,
        am.SetSelectedDataAsync
    ]);
    OSF.DDA.DispIdHost.addEventSupport(this, new OSF.EventDispatch([Microsoft.Office.WebExtension.EventType.DocumentSelectionChanged]));
};
OSF.OUtil.extend(OSF.DDA.JsomDocument, OSF.DDA.Document);
OSF.OUtil.defineEnumerableProperty(Microsoft.Office.WebExtension, "context", {
    get: function Microsoft_Office_WebExtension$GetContext() {
        var context;
        if (OSF && OSF._OfficeAppFactory) {
            context = OSF._OfficeAppFactory.getContext();
        }
        return context;
    }
});
OSF.DDA.License = function OSF_DDA_License(eToken) {
    OSF.OUtil.defineEnumerableProperty(this, "value", {
        value: eToken
    });
};
OSF.DDA.ApiMethodCall = function OSF_DDA_ApiMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, checkCallArgs, displayName) {
    var requiredCount = requiredParameters.length;
    var getInvalidParameterString = OSF.OUtil.delayExecutionAndCache(function () {
        return OSF.OUtil.formatString(Strings.OfficeOM.L_InvalidParameters, displayName);
    });
    this.verifyArguments = function OSF_DDA_ApiMethodCall$VerifyArguments(params, args) {
        for (var name in params) {
            var param = params[name];
            var arg = args[name];
            if (param["enum"]) {
                switch (typeof arg) {
                    case "string":
                        if (OSF.OUtil.listContainsValue(param["enum"], arg)) {
                            break;
                        }
                    case "undefined":
                        throw OSF.DDA.ErrorCodeManager.errorCodes.ooeUnsupportedEnumeration;
                    default:
                        throw getInvalidParameterString();
                }
            }
            if (param["types"]) {
                if (!OSF.OUtil.listContainsValue(param["types"], typeof arg)) {
                    throw getInvalidParameterString();
                }
            }
        }
    };
    this.extractRequiredArguments = function OSF_DDA_ApiMethodCall$ExtractRequiredArguments(userArgs, caller, stateInfo) {
        if (userArgs.length < requiredCount) {
            throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_MissingRequiredArguments);
        }
        var requiredArgs = [];
        var index;
        for (index = 0; index < requiredCount; index++) {
            requiredArgs.push(userArgs[index]);
        }
        this.verifyArguments(requiredParameters, requiredArgs);
        var ret = {};
        for (index = 0; index < requiredCount; index++) {
            var param = requiredParameters[index];
            var arg = requiredArgs[index];
            if (param.verify) {
                var isValid = param.verify(arg, caller, stateInfo);
                if (!isValid) {
                    throw getInvalidParameterString();
                }
            }
            ret[param.name] = arg;
        }
        return ret;
    },
        this.fillOptions = function OSF_DDA_ApiMethodCall$FillOptions(options, requiredArgs, caller, stateInfo) {
            options = options || {};
            for (var optionName in supportedOptions) {
                if (!OSF.OUtil.listContainsKey(options, optionName)) {
                    var value = undefined;
                    var option = supportedOptions[optionName];
                    if (option.calculate && requiredArgs) {
                        value = option.calculate(requiredArgs, caller, stateInfo);
                    }
                    if (!value && option.defaultValue !== undefined) {
                        value = option.defaultValue;
                    }
                    options[optionName] = value;
                }
            }
            return options;
        };
    this.constructCallArgs = function OSF_DAA_ApiMethodCall$ConstructCallArgs(required, options, caller, stateInfo) {
        var callArgs = {};
        for (var r in required) {
            callArgs[r] = required[r];
        }
        for (var o in options) {
            callArgs[o] = options[o];
        }
        for (var s in privateStateCallbacks) {
            callArgs[s] = privateStateCallbacks[s](caller, stateInfo);
        }
        if (checkCallArgs) {
            callArgs = checkCallArgs(callArgs, caller, stateInfo);
        }
        return callArgs;
    };
};
OSF.OUtil.setNamespace("AsyncResultEnum", OSF.DDA);
OSF.DDA.AsyncResultEnum.Properties = {
    Context: "Context",
    Value: "Value",
    Status: "Status",
    Error: "Error"
};
Microsoft.Office.WebExtension.AsyncResultStatus = {
    Succeeded: "succeeded",
    Failed: "failed"
};
OSF.DDA.AsyncResultEnum.ErrorCode = {
    Success: 0,
    Failed: 1
};
OSF.DDA.AsyncResultEnum.ErrorProperties = {
    Name: "Name",
    Message: "Message",
    Code: "Code"
};
OSF.DDA.AsyncMethodNames = {};
OSF.DDA.AsyncMethodNames.addNames = function (methodNames) {
    for (var entry in methodNames) {
        var am = {};
        OSF.OUtil.defineEnumerableProperties(am, {
            "id": {
                value: entry
            },
            "displayName": {
                value: methodNames[entry]
            }
        });
        OSF.DDA.AsyncMethodNames[entry] = am;
    }
};
OSF.DDA.AsyncMethodCall = function OSF_DDA_AsyncMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, onSucceeded, onFailed, checkCallArgs, displayName) {
    var requiredCount = requiredParameters.length;
    var apiMethods = new OSF.DDA.ApiMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, checkCallArgs, displayName);
    function OSF_DAA_AsyncMethodCall$ExtractOptions(userArgs, requiredArgs, caller, stateInfo) {
        if (userArgs.length > requiredCount + 2) {
            throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_TooManyArguments);
        }
        var options, parameterCallback;
        for (var i = userArgs.length - 1; i >= requiredCount; i--) {
            var argument = userArgs[i];
            switch (typeof argument) {
                case "object":
                    if (options) {
                        throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_TooManyOptionalObjects);
                    }
                    else {
                        options = argument;
                    }
                    break;
                case "function":
                    if (parameterCallback) {
                        throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_TooManyOptionalFunction);
                    }
                    else {
                        parameterCallback = argument;
                    }
                    break;
                default:
                    throw OsfMsAjaxFactory.msAjaxError.argument(Strings.OfficeOM.L_InValidOptionalArgument);
                    break;
            }
        }
        options = apiMethods.fillOptions(options, requiredArgs, caller, stateInfo);
        if (parameterCallback) {
            if (options[Microsoft.Office.WebExtension.Parameters.Callback]) {
                throw Strings.OfficeOM.L_RedundantCallbackSpecification;
            }
            else {
                options[Microsoft.Office.WebExtension.Parameters.Callback] = parameterCallback;
            }
        }
        apiMethods.verifyArguments(supportedOptions, options);
        return options;
    }
    ;
    this.verifyAndExtractCall = function OSF_DAA_AsyncMethodCall$VerifyAndExtractCall(userArgs, caller, stateInfo) {
        var required = apiMethods.extractRequiredArguments(userArgs, caller, stateInfo);
        var options = OSF_DAA_AsyncMethodCall$ExtractOptions(userArgs, required, caller, stateInfo);
        var callArgs = apiMethods.constructCallArgs(required, options, caller, stateInfo);
        return callArgs;
    };
    this.processResponse = function OSF_DAA_AsyncMethodCall$ProcessResponse(status, response, caller, callArgs) {
        var payload;
        if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
            if (onSucceeded) {
                payload = onSucceeded(response, caller, callArgs);
            }
            else {
                payload = response;
            }
        }
        else {
            if (onFailed) {
                payload = onFailed(status, response);
            }
            else {
                payload = OSF.DDA.ErrorCodeManager.getErrorArgs(status);
            }
        }
        return payload;
    };
    this.getCallArgs = function (suppliedArgs) {
        var options, parameterCallback;
        for (var i = suppliedArgs.length - 1; i >= requiredCount; i--) {
            var argument = suppliedArgs[i];
            switch (typeof argument) {
                case "object":
                    options = argument;
                    break;
                case "function":
                    parameterCallback = argument;
                    break;
            }
        }
        options = options || {};
        if (parameterCallback) {
            options[Microsoft.Office.WebExtension.Parameters.Callback] = parameterCallback;
        }
        return options;
    };
};
OSF.DDA.AsyncMethodCallFactory = (function () {
    return {
        manufacture: function (params) {
            var supportedOptions = params.supportedOptions ? OSF.OUtil.createObject(params.supportedOptions) : [];
            var privateStateCallbacks = params.privateStateCallbacks ? OSF.OUtil.createObject(params.privateStateCallbacks) : [];
            return new OSF.DDA.AsyncMethodCall(params.requiredArguments || [], supportedOptions, privateStateCallbacks, params.onSucceeded, params.onFailed, params.checkCallArgs, params.method.displayName);
        }
    };
})();
OSF.DDA.AsyncMethodCalls = {};
OSF.DDA.AsyncMethodCalls.define = function (callDefinition) {
    OSF.DDA.AsyncMethodCalls[callDefinition.method.id] = OSF.DDA.AsyncMethodCallFactory.manufacture(callDefinition);
};
OSF.DDA.Error = function OSF_DDA_Error(name, message, code) {
    OSF.OUtil.defineEnumerableProperties(this, {
        "name": {
            value: name
        },
        "message": {
            value: message
        },
        "code": {
            value: code
        }
    });
};
OSF.DDA.AsyncResult = function OSF_DDA_AsyncResult(initArgs, errorArgs) {
    OSF.OUtil.defineEnumerableProperties(this, {
        "value": {
            value: initArgs[OSF.DDA.AsyncResultEnum.Properties.Value]
        },
        "status": {
            value: errorArgs ? Microsoft.Office.WebExtension.AsyncResultStatus.Failed : Microsoft.Office.WebExtension.AsyncResultStatus.Succeeded
        }
    });
    if (initArgs[OSF.DDA.AsyncResultEnum.Properties.Context]) {
        OSF.OUtil.defineEnumerableProperty(this, "asyncContext", {
            value: initArgs[OSF.DDA.AsyncResultEnum.Properties.Context]
        });
    }
    if (errorArgs) {
        OSF.OUtil.defineEnumerableProperty(this, "error", {
            value: new OSF.DDA.Error(errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name], errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message], errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Code])
        });
    }
};
OSF.DDA.issueAsyncResult = function OSF_DDA$IssueAsyncResult(callArgs, status, payload) {
    var callback = callArgs[Microsoft.Office.WebExtension.Parameters.Callback];
    if (callback) {
        var asyncInitArgs = {};
        asyncInitArgs[OSF.DDA.AsyncResultEnum.Properties.Context] = callArgs[Microsoft.Office.WebExtension.Parameters.AsyncContext];
        var errorArgs;
        if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
            asyncInitArgs[OSF.DDA.AsyncResultEnum.Properties.Value] = payload;
        }
        else {
            errorArgs = {};
            payload = payload || OSF.DDA.ErrorCodeManager.getErrorArgs(OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError);
            errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Code] = status || OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
            errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name] = payload.name || payload;
            errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message] = payload.message || payload;
        }
        callback(new OSF.DDA.AsyncResult(asyncInitArgs, errorArgs));
    }
};
OSF.DDA.SyncMethodNames = {};
OSF.DDA.SyncMethodNames.addNames = function (methodNames) {
    for (var entry in methodNames) {
        var am = {};
        OSF.OUtil.defineEnumerableProperties(am, {
            "id": {
                value: entry
            },
            "displayName": {
                value: methodNames[entry]
            }
        });
        OSF.DDA.SyncMethodNames[entry] = am;
    }
};
OSF.DDA.SyncMethodCall = function OSF_DDA_SyncMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, checkCallArgs, displayName) {
    var requiredCount = requiredParameters.length;
    var apiMethods = new OSF.DDA.ApiMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, checkCallArgs, displayName);
    function OSF_DAA_SyncMethodCall$ExtractOptions(userArgs, requiredArgs, caller, stateInfo) {
        if (userArgs.length > requiredCount + 1) {
            throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_TooManyArguments);
        }
        var options, parameterCallback;
        for (var i = userArgs.length - 1; i >= requiredCount; i--) {
            var argument = userArgs[i];
            switch (typeof argument) {
                case "object":
                    if (options) {
                        throw OsfMsAjaxFactory.msAjaxError.parameterCount(Strings.OfficeOM.L_TooManyOptionalObjects);
                    }
                    else {
                        options = argument;
                    }
                    break;
                default:
                    throw OsfMsAjaxFactory.msAjaxError.argument(Strings.OfficeOM.L_InValidOptionalArgument);
                    break;
            }
        }
        options = apiMethods.fillOptions(options, requiredArgs, caller, stateInfo);
        apiMethods.verifyArguments(supportedOptions, options);
        return options;
    }
    ;
    this.verifyAndExtractCall = function OSF_DAA_AsyncMethodCall$VerifyAndExtractCall(userArgs, caller, stateInfo) {
        var required = apiMethods.extractRequiredArguments(userArgs, caller, stateInfo);
        var options = OSF_DAA_SyncMethodCall$ExtractOptions(userArgs, required, caller, stateInfo);
        var callArgs = apiMethods.constructCallArgs(required, options, caller, stateInfo);
        return callArgs;
    };
};
OSF.DDA.SyncMethodCallFactory = (function () {
    return {
        manufacture: function (params) {
            var supportedOptions = params.supportedOptions ? OSF.OUtil.createObject(params.supportedOptions) : [];
            return new OSF.DDA.SyncMethodCall(params.requiredArguments || [], supportedOptions, params.privateStateCallbacks, params.checkCallArgs, params.method.displayName);
        }
    };
})();
OSF.DDA.SyncMethodCalls = {};
OSF.DDA.SyncMethodCalls.define = function (callDefinition) {
    OSF.DDA.SyncMethodCalls[callDefinition.method.id] = OSF.DDA.SyncMethodCallFactory.manufacture(callDefinition);
};
OSF.DDA.ListType = (function () {
    var listTypes = {};
    return {
        setListType: function OSF_DDA_ListType$AddListType(t, prop) { listTypes[t] = prop; },
        isListType: function OSF_DDA_ListType$IsListType(t) { return OSF.OUtil.listContainsKey(listTypes, t); },
        getDescriptor: function OSF_DDA_ListType$getDescriptor(t) { return listTypes[t]; }
    };
})();
OSF.DDA.HostParameterMap = function (specialProcessor, mappings) {
    var toHostMap = "toHost";
    var fromHostMap = "fromHost";
    var sourceData = "sourceData";
    var self = "self";
    var dynamicTypes = {};
    dynamicTypes[Microsoft.Office.WebExtension.Parameters.Data] = {
        toHost: function (data) {
            if (data != null && data.rows !== undefined) {
                var tableData = {};
                tableData[OSF.DDA.TableDataProperties.TableRows] = data.rows;
                tableData[OSF.DDA.TableDataProperties.TableHeaders] = data.headers;
                data = tableData;
            }
            return data;
        },
        fromHost: function (args) {
            return args;
        }
    };
    dynamicTypes[Microsoft.Office.WebExtension.Parameters.SampleData] = dynamicTypes[Microsoft.Office.WebExtension.Parameters.Data];
    function mapValues(preimageSet, mapping) {
        var ret = preimageSet ? {} : undefined;
        for (var entry in preimageSet) {
            var preimage = preimageSet[entry];
            var image;
            if (OSF.DDA.ListType.isListType(entry)) {
                image = [];
                for (var subEntry in preimage) {
                    image.push(mapValues(preimage[subEntry], mapping));
                }
            }
            else if (OSF.OUtil.listContainsKey(dynamicTypes, entry)) {
                image = dynamicTypes[entry][mapping](preimage);
            }
            else if (mapping == fromHostMap && specialProcessor.preserveNesting(entry)) {
                image = mapValues(preimage, mapping);
            }
            else {
                var maps = mappings[entry];
                if (maps) {
                    var map = maps[mapping];
                    if (map) {
                        image = map[preimage];
                        if (image === undefined) {
                            image = preimage;
                        }
                    }
                }
                else {
                    image = preimage;
                }
            }
            ret[entry] = image;
        }
        return ret;
    }
    ;
    function generateArguments(imageSet, parameters) {
        var ret;
        for (var param in parameters) {
            var arg;
            if (specialProcessor.isComplexType(param)) {
                arg = generateArguments(imageSet, mappings[param][toHostMap]);
            }
            else {
                arg = imageSet[param];
            }
            if (arg != undefined) {
                if (!ret) {
                    ret = {};
                }
                var index = parameters[param];
                if (index == self) {
                    index = param;
                }
                ret[index] = specialProcessor.pack(param, arg);
            }
        }
        return ret;
    }
    ;
    function extractArguments(source, parameters, extracted) {
        if (!extracted) {
            extracted = {};
        }
        for (var param in parameters) {
            var index = parameters[param];
            var value;
            if (index == self) {
                value = source;
            }
            else if (index == sourceData) {
                extracted[param] = source.toArray();
                continue;
            }
            else {
                value = source[index];
            }
            if (value === null || value === undefined) {
                extracted[param] = undefined;
            }
            else {
                value = specialProcessor.unpack(param, value);
                var map;
                if (specialProcessor.isComplexType(param)) {
                    map = mappings[param][fromHostMap];
                    if (specialProcessor.preserveNesting(param)) {
                        extracted[param] = extractArguments(value, map);
                    }
                    else {
                        extractArguments(value, map, extracted);
                    }
                }
                else {
                    if (OSF.DDA.ListType.isListType(param)) {
                        map = {};
                        var entryDescriptor = OSF.DDA.ListType.getDescriptor(param);
                        map[entryDescriptor] = self;
                        var extractedValues = new Array(value.length);
                        for (var item in value) {
                            extractedValues[item] = extractArguments(value[item], map);
                        }
                        extracted[param] = extractedValues;
                    }
                    else {
                        extracted[param] = value;
                    }
                }
            }
        }
        return extracted;
    }
    ;
    function applyMap(mapName, preimage, mapping) {
        var parameters = mappings[mapName][mapping];
        var image;
        if (mapping == "toHost") {
            var imageSet = mapValues(preimage, mapping);
            image = generateArguments(imageSet, parameters);
        }
        else if (mapping == "fromHost") {
            var argumentSet = extractArguments(preimage, parameters);
            image = mapValues(argumentSet, mapping);
        }
        return image;
    }
    ;
    if (!mappings) {
        mappings = {};
    }
    this.addMapping = function (mapName, description) {
        var toHost, fromHost;
        if (description.map) {
            toHost = description.map;
            fromHost = {};
            for (var preimage in toHost) {
                var image = toHost[preimage];
                if (image == self) {
                    image = preimage;
                }
                fromHost[image] = preimage;
            }
        }
        else {
            toHost = description.toHost;
            fromHost = description.fromHost;
        }
        var pair = mappings[mapName];
        if (pair) {
            var currMap = pair[toHostMap];
            for (var th in currMap)
                toHost[th] = currMap[th];
            currMap = pair[fromHostMap];
            for (var fh in currMap)
                fromHost[fh] = currMap[fh];
        }
        else {
            pair = mappings[mapName] = {};
        }
        pair[toHostMap] = toHost;
        pair[fromHostMap] = fromHost;
    };
    this.toHost = function (mapName, preimage) { return applyMap(mapName, preimage, toHostMap); };
    this.fromHost = function (mapName, image) { return applyMap(mapName, image, fromHostMap); };
    this.self = self;
    this.sourceData = sourceData;
    this.addComplexType = function (ct) { specialProcessor.addComplexType(ct); };
    this.getDynamicType = function (dt) { return specialProcessor.getDynamicType(dt); };
    this.setDynamicType = function (dt, handler) { specialProcessor.setDynamicType(dt, handler); };
    this.dynamicTypes = dynamicTypes;
    this.doMapValues = function (preimageSet, mapping) { return mapValues(preimageSet, mapping); };
};
OSF.DDA.SpecialProcessor = function (complexTypes, dynamicTypes) {
    this.addComplexType = function OSF_DDA_SpecialProcessor$addComplexType(ct) {
        complexTypes.push(ct);
    };
    this.getDynamicType = function OSF_DDA_SpecialProcessor$getDynamicType(dt) {
        return dynamicTypes[dt];
    };
    this.setDynamicType = function OSF_DDA_SpecialProcessor$setDynamicType(dt, handler) {
        dynamicTypes[dt] = handler;
    };
    this.isComplexType = function OSF_DDA_SpecialProcessor$isComplexType(t) {
        return OSF.OUtil.listContainsValue(complexTypes, t);
    };
    this.isDynamicType = function OSF_DDA_SpecialProcessor$isDynamicType(p) {
        return OSF.OUtil.listContainsKey(dynamicTypes, p);
    };
    this.preserveNesting = function OSF_DDA_SpecialProcessor$preserveNesting(p) {
        var pn = [];
        if (OSF.DDA.PropertyDescriptors)
            pn.push(OSF.DDA.PropertyDescriptors.Subset);
        if (OSF.DDA.DataNodeEventProperties) {
            pn = pn.concat([
                OSF.DDA.DataNodeEventProperties.OldNode,
                OSF.DDA.DataNodeEventProperties.NewNode,
                OSF.DDA.DataNodeEventProperties.NextSiblingNode
            ]);
        }
        return OSF.OUtil.listContainsValue(pn, p);
    };
    this.pack = function OSF_DDA_SpecialProcessor$pack(param, arg) {
        var value;
        if (this.isDynamicType(param)) {
            value = dynamicTypes[param].toHost(arg);
        }
        else {
            value = arg;
        }
        return value;
    };
    this.unpack = function OSF_DDA_SpecialProcessor$unpack(param, arg) {
        var value;
        if (this.isDynamicType(param)) {
            value = dynamicTypes[param].fromHost(arg);
        }
        else {
            value = arg;
        }
        return value;
    };
};
OSF.DDA.getDecoratedParameterMap = function (specialProcessor, initialDefs) {
    var parameterMap = new OSF.DDA.HostParameterMap(specialProcessor);
    var self = parameterMap.self;
    function createObject(properties) {
        var obj = null;
        if (properties) {
            obj = {};
            var len = properties.length;
            for (var i = 0; i < len; i++) {
                obj[properties[i].name] = properties[i].value;
            }
        }
        return obj;
    }
    parameterMap.define = function define(definition) {
        var args = {};
        var toHost = createObject(definition.toHost);
        if (definition.invertible) {
            args.map = toHost;
        }
        else if (definition.canonical) {
            args.toHost = args.fromHost = toHost;
        }
        else {
            args.toHost = toHost;
            args.fromHost = createObject(definition.fromHost);
        }
        parameterMap.addMapping(definition.type, args);
        if (definition.isComplexType)
            parameterMap.addComplexType(definition.type);
    };
    for (var id in initialDefs)
        parameterMap.define(initialDefs[id]);
    return parameterMap;
};
OSF.OUtil.setNamespace("DispIdHost", OSF.DDA);
OSF.DDA.DispIdHost.Methods = {
    InvokeMethod: "invokeMethod",
    AddEventHandler: "addEventHandler",
    RemoveEventHandler: "removeEventHandler",
    OpenDialog: "openDialog",
    CloseDialog: "closeDialog",
    MessageParent: "messageParent",
    SendMessage: "sendMessage"
};
OSF.DDA.DispIdHost.Delegates = {
    ExecuteAsync: "executeAsync",
    RegisterEventAsync: "registerEventAsync",
    UnregisterEventAsync: "unregisterEventAsync",
    ParameterMap: "parameterMap",
    OpenDialog: "openDialog",
    CloseDialog: "closeDialog",
    MessageParent: "messageParent",
    SendMessage: "sendMessage"
};
OSF.DDA.DispIdHost.Facade = function OSF_DDA_DispIdHost_Facade(getDelegateMethods, parameterMap) {
    var dispIdMap = {};
    var jsom = OSF.DDA.AsyncMethodNames;
    var did = OSF.DDA.MethodDispId;
    var methodMap = {
        "GoToByIdAsync": did.dispidNavigateToMethod,
        "GetSelectedDataAsync": did.dispidGetSelectedDataMethod,
        "SetSelectedDataAsync": did.dispidSetSelectedDataMethod,
        "GetDocumentCopyChunkAsync": did.dispidGetDocumentCopyChunkMethod,
        "ReleaseDocumentCopyAsync": did.dispidReleaseDocumentCopyMethod,
        "GetDocumentCopyAsync": did.dispidGetDocumentCopyMethod,
        "AddFromSelectionAsync": did.dispidAddBindingFromSelectionMethod,
        "AddFromPromptAsync": did.dispidAddBindingFromPromptMethod,
        "AddFromNamedItemAsync": did.dispidAddBindingFromNamedItemMethod,
        "GetAllAsync": did.dispidGetAllBindingsMethod,
        "GetByIdAsync": did.dispidGetBindingMethod,
        "ReleaseByIdAsync": did.dispidReleaseBindingMethod,
        "GetDataAsync": did.dispidGetBindingDataMethod,
        "SetDataAsync": did.dispidSetBindingDataMethod,
        "AddRowsAsync": did.dispidAddRowsMethod,
        "AddColumnsAsync": did.dispidAddColumnsMethod,
        "DeleteAllDataValuesAsync": did.dispidClearAllRowsMethod,
        "RefreshAsync": did.dispidLoadSettingsMethod,
        "SaveAsync": did.dispidSaveSettingsMethod,
        "GetActiveViewAsync": did.dispidGetActiveViewMethod,
        "GetFilePropertiesAsync": did.dispidGetFilePropertiesMethod,
        "GetOfficeThemeAsync": did.dispidGetOfficeThemeMethod,
        "GetDocumentThemeAsync": did.dispidGetDocumentThemeMethod,
        "ClearFormatsAsync": did.dispidClearFormatsMethod,
        "SetTableOptionsAsync": did.dispidSetTableOptionsMethod,
        "SetFormatsAsync": did.dispidSetFormatsMethod,
        "GetAccessTokenAsync": did.dispidGetAccessTokenMethod,
        "GetAuthContextAsync": did.dispidGetAuthContextMethod,
        "ExecuteRichApiRequestAsync": did.dispidExecuteRichApiRequestMethod,
        "AppCommandInvocationCompletedAsync": did.dispidAppCommandInvocationCompletedMethod,
        "CloseContainerAsync": did.dispidCloseContainerMethod,
        "OpenBrowserWindow": did.dispidOpenBrowserWindow,
        "CreateDocumentAsync": did.dispidCreateDocumentMethod,
        "InsertFormAsync": did.dispidInsertFormMethod,
        "ExecuteFeature": did.dispidExecuteFeature,
        "QueryFeature": did.dispidQueryFeature,
        "AddDataPartAsync": did.dispidAddDataPartMethod,
        "GetDataPartByIdAsync": did.dispidGetDataPartByIdMethod,
        "GetDataPartsByNameSpaceAsync": did.dispidGetDataPartsByNamespaceMethod,
        "GetPartXmlAsync": did.dispidGetDataPartXmlMethod,
        "GetPartNodesAsync": did.dispidGetDataPartNodesMethod,
        "DeleteDataPartAsync": did.dispidDeleteDataPartMethod,
        "GetNodeValueAsync": did.dispidGetDataNodeValueMethod,
        "GetNodeXmlAsync": did.dispidGetDataNodeXmlMethod,
        "GetRelativeNodesAsync": did.dispidGetDataNodesMethod,
        "SetNodeValueAsync": did.dispidSetDataNodeValueMethod,
        "SetNodeXmlAsync": did.dispidSetDataNodeXmlMethod,
        "AddDataPartNamespaceAsync": did.dispidAddDataNamespaceMethod,
        "GetDataPartNamespaceAsync": did.dispidGetDataUriByPrefixMethod,
        "GetDataPartPrefixAsync": did.dispidGetDataPrefixByUriMethod,
        "GetNodeTextAsync": did.dispidGetDataNodeTextMethod,
        "SetNodeTextAsync": did.dispidSetDataNodeTextMethod,
        "GetSelectedTask": did.dispidGetSelectedTaskMethod,
        "GetTask": did.dispidGetTaskMethod,
        "GetWSSUrl": did.dispidGetWSSUrlMethod,
        "GetTaskField": did.dispidGetTaskFieldMethod,
        "GetSelectedResource": did.dispidGetSelectedResourceMethod,
        "GetResourceField": did.dispidGetResourceFieldMethod,
        "GetProjectField": did.dispidGetProjectFieldMethod,
        "GetSelectedView": did.dispidGetSelectedViewMethod,
        "GetTaskByIndex": did.dispidGetTaskByIndexMethod,
        "GetResourceByIndex": did.dispidGetResourceByIndexMethod,
        "SetTaskField": did.dispidSetTaskFieldMethod,
        "SetResourceField": did.dispidSetResourceFieldMethod,
        "GetMaxTaskIndex": did.dispidGetMaxTaskIndexMethod,
        "GetMaxResourceIndex": did.dispidGetMaxResourceIndexMethod,
        "CreateTask": did.dispidCreateTaskMethod
    };
    for (var method in methodMap) {
        if (jsom[method]) {
            dispIdMap[jsom[method].id] = methodMap[method];
        }
    }
    jsom = OSF.DDA.SyncMethodNames;
    did = OSF.DDA.MethodDispId;
    var syncMethodMap = {
        "MessageParent": did.dispidMessageParentMethod,
        "SendMessage": did.dispidSendMessageMethod
    };
    for (var method in syncMethodMap) {
        if (jsom[method]) {
            dispIdMap[jsom[method].id] = syncMethodMap[method];
        }
    }
    jsom = Microsoft.Office.WebExtension.EventType;
    did = OSF.DDA.EventDispId;
    var eventMap = {
        "SettingsChanged": did.dispidSettingsChangedEvent,
        "DocumentSelectionChanged": did.dispidDocumentSelectionChangedEvent,
        "BindingSelectionChanged": did.dispidBindingSelectionChangedEvent,
        "BindingDataChanged": did.dispidBindingDataChangedEvent,
        "ActiveViewChanged": did.dispidActiveViewChangedEvent,
        "OfficeThemeChanged": did.dispidOfficeThemeChangedEvent,
        "DocumentThemeChanged": did.dispidDocumentThemeChangedEvent,
        "AppCommandInvoked": did.dispidAppCommandInvokedEvent,
        "DialogMessageReceived": did.dispidDialogMessageReceivedEvent,
        "DialogParentMessageReceived": did.dispidDialogParentMessageReceivedEvent,
        "ObjectDeleted": did.dispidObjectDeletedEvent,
        "ObjectSelectionChanged": did.dispidObjectSelectionChangedEvent,
        "ObjectDataChanged": did.dispidObjectDataChangedEvent,
        "ContentControlAdded": did.dispidContentControlAddedEvent,
        "RichApiMessage": did.dispidRichApiMessageEvent,
        "ItemChanged": did.dispidOlkItemSelectedChangedEvent,
        "RecipientsChanged": did.dispidOlkRecipientsChangedEvent,
        "AppointmentTimeChanged": did.dispidOlkAppointmentTimeChangedEvent,
        "RecurrenceChanged": did.dispidOlkRecurrenceChangedEvent,
        "AttachmentsChanged": did.dispidOlkAttachmentsChangedEvent,
        "EnhancedLocationsChanged": did.dispidOlkEnhancedLocationsChangedEvent,
        "InfobarClicked": did.dispidOlkInfobarClickedEvent,
        "TaskSelectionChanged": did.dispidTaskSelectionChangedEvent,
        "ResourceSelectionChanged": did.dispidResourceSelectionChangedEvent,
        "ViewSelectionChanged": did.dispidViewSelectionChangedEvent,
        "DataNodeInserted": did.dispidDataNodeAddedEvent,
        "DataNodeReplaced": did.dispidDataNodeReplacedEvent,
        "DataNodeDeleted": did.dispidDataNodeDeletedEvent
    };
    for (var event in eventMap) {
        if (jsom[event]) {
            dispIdMap[jsom[event]] = eventMap[event];
        }
    }
    function IsObjectEvent(dispId) {
        return (dispId == OSF.DDA.EventDispId.dispidObjectDeletedEvent ||
            dispId == OSF.DDA.EventDispId.dispidObjectSelectionChangedEvent ||
            dispId == OSF.DDA.EventDispId.dispidObjectDataChangedEvent ||
            dispId == OSF.DDA.EventDispId.dispidContentControlAddedEvent);
    }
    function onException(ex, asyncMethodCall, suppliedArgs, callArgs) {
        if (typeof ex == "number") {
            if (!callArgs) {
                callArgs = asyncMethodCall.getCallArgs(suppliedArgs);
            }
            OSF.DDA.issueAsyncResult(callArgs, ex, OSF.DDA.ErrorCodeManager.getErrorArgs(ex));
        }
        else {
            throw ex;
        }
    }
    ;
    this[OSF.DDA.DispIdHost.Methods.InvokeMethod] = function OSF_DDA_DispIdHost_Facade$InvokeMethod(method, suppliedArguments, caller, privateState) {
        var callArgs;
        try {
            var methodName = method.id;
            var asyncMethodCall = OSF.DDA.AsyncMethodCalls[methodName];
            callArgs = asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, privateState);
            var dispId = dispIdMap[methodName];
            var delegate = getDelegateMethods(methodName);
            var richApiInExcelMethodSubstitution = null;
            if (window.Excel && window.Office.context.requirements.isSetSupported("RedirectV1Api")) {
                window.Excel._RedirectV1APIs = true;
            }
            if (window.Excel && window.Excel._RedirectV1APIs && (richApiInExcelMethodSubstitution = window.Excel._V1APIMap[methodName])) {
                var preprocessedCallArgs = OSF.OUtil.shallowCopy(callArgs);
                delete preprocessedCallArgs[Microsoft.Office.WebExtension.Parameters.AsyncContext];
                if (richApiInExcelMethodSubstitution.preprocess) {
                    preprocessedCallArgs = richApiInExcelMethodSubstitution.preprocess(preprocessedCallArgs);
                }
                var ctx = new window.Excel.RequestContext();
                var result = richApiInExcelMethodSubstitution.call(ctx, preprocessedCallArgs);
                ctx.sync()
                    .then(function () {
                    var response = result.value;
                    var status = response.status;
                    delete response["status"];
                    delete response["@odata.type"];
                    if (richApiInExcelMethodSubstitution.postprocess) {
                        response = richApiInExcelMethodSubstitution.postprocess(response, preprocessedCallArgs);
                    }
                    if (status != 0) {
                        response = OSF.DDA.ErrorCodeManager.getErrorArgs(status);
                    }
                    OSF.DDA.issueAsyncResult(callArgs, status, response);
                })["catch"](function (error) {
                    OSF.DDA.issueAsyncResult(callArgs, OSF.DDA.ErrorCodeManager.errorCodes.ooeFailure, null);
                });
            }
            else {
                var hostCallArgs;
                if (parameterMap.toHost) {
                    hostCallArgs = parameterMap.toHost(dispId, callArgs);
                }
                else {
                    hostCallArgs = callArgs;
                }
                var startTime = (new Date()).getTime();
                delegate[OSF.DDA.DispIdHost.Delegates.ExecuteAsync]({
                    "dispId": dispId,
                    "hostCallArgs": hostCallArgs,
                    "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { },
                    "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { },
                    "onComplete": function (status, hostResponseArgs) {
                        var responseArgs;
                        if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                            if (parameterMap.fromHost) {
                                responseArgs = parameterMap.fromHost(dispId, hostResponseArgs);
                            }
                            else {
                                responseArgs = hostResponseArgs;
                            }
                        }
                        else {
                            responseArgs = hostResponseArgs;
                        }
                        var payload = asyncMethodCall.processResponse(status, responseArgs, caller, callArgs);
                        OSF.DDA.issueAsyncResult(callArgs, status, payload);
                        if (OSF.AppTelemetry && !(OSF.ConstantNames && OSF.ConstantNames.IsCustomFunctionsRuntime)) {
                            OSF.AppTelemetry.onMethodDone(dispId, hostCallArgs, Math.abs((new Date()).getTime() - startTime), status);
                        }
                    }
                });
            }
        }
        catch (ex) {
            onException(ex, asyncMethodCall, suppliedArguments, callArgs);
        }
    };
    this[OSF.DDA.DispIdHost.Methods.AddEventHandler] = function OSF_DDA_DispIdHost_Facade$AddEventHandler(suppliedArguments, eventDispatch, caller, isPopupWindow) {
        var callArgs;
        var eventType, handler;
        var isObjectEvent = false;
        function onEnsureRegistration(status) {
            if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                var added = !isObjectEvent ? eventDispatch.addEventHandler(eventType, handler) :
                    eventDispatch.addObjectEventHandler(eventType, callArgs[Microsoft.Office.WebExtension.Parameters.Id], handler);
                if (!added) {
                    status = OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerAdditionFailed;
                }
            }
            var error;
            if (status != OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                error = OSF.DDA.ErrorCodeManager.getErrorArgs(status);
            }
            OSF.DDA.issueAsyncResult(callArgs, status, error);
        }
        try {
            var asyncMethodCall = OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.AddHandlerAsync.id];
            callArgs = asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
            eventType = callArgs[Microsoft.Office.WebExtension.Parameters.EventType];
            handler = callArgs[Microsoft.Office.WebExtension.Parameters.Handler];
            if (isPopupWindow) {
                onEnsureRegistration(OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess);
                return;
            }
            var dispId = dispIdMap[eventType];
            isObjectEvent = IsObjectEvent(dispId);
            var targetId = (isObjectEvent ? callArgs[Microsoft.Office.WebExtension.Parameters.Id] : (caller.id || ""));
            var count = isObjectEvent ? eventDispatch.getObjectEventHandlerCount(eventType, targetId) : eventDispatch.getEventHandlerCount(eventType);
            if (count == 0) {
                var invoker = getDelegateMethods(eventType)[OSF.DDA.DispIdHost.Delegates.RegisterEventAsync];
                invoker({
                    "eventType": eventType,
                    "dispId": dispId,
                    "targetId": targetId,
                    "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
                    "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
                    "onComplete": onEnsureRegistration,
                    "onEvent": function handleEvent(hostArgs) {
                        var args = parameterMap.fromHost(dispId, hostArgs);
                        if (!isObjectEvent)
                            eventDispatch.fireEvent(OSF.DDA.OMFactory.manufactureEventArgs(eventType, caller, args));
                        else
                            eventDispatch.fireObjectEvent(targetId, OSF.DDA.OMFactory.manufactureEventArgs(eventType, targetId, args));
                    }
                });
            }
            else {
                onEnsureRegistration(OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess);
            }
        }
        catch (ex) {
            onException(ex, asyncMethodCall, suppliedArguments, callArgs);
        }
    };
    this[OSF.DDA.DispIdHost.Methods.RemoveEventHandler] = function OSF_DDA_DispIdHost_Facade$RemoveEventHandler(suppliedArguments, eventDispatch, caller) {
        var callArgs;
        var eventType, handler;
        var isObjectEvent = false;
        function onEnsureRegistration(status) {
            var error;
            if (status != OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                error = OSF.DDA.ErrorCodeManager.getErrorArgs(status);
            }
            OSF.DDA.issueAsyncResult(callArgs, status, error);
        }
        try {
            var asyncMethodCall = OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.RemoveHandlerAsync.id];
            callArgs = asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
            eventType = callArgs[Microsoft.Office.WebExtension.Parameters.EventType];
            handler = callArgs[Microsoft.Office.WebExtension.Parameters.Handler];
            var dispId = dispIdMap[eventType];
            isObjectEvent = IsObjectEvent(dispId);
            var targetId = (isObjectEvent ? callArgs[Microsoft.Office.WebExtension.Parameters.Id] : (caller.id || ""));
            var status, removeSuccess;
            if (handler === null) {
                removeSuccess = isObjectEvent ? eventDispatch.clearObjectEventHandlers(eventType, targetId) : eventDispatch.clearEventHandlers(eventType);
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess;
            }
            else {
                removeSuccess = isObjectEvent ? eventDispatch.removeObjectEventHandler(eventType, targetId, handler) : eventDispatch.removeEventHandler(eventType, handler);
                status = removeSuccess ? OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess : OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerNotExist;
            }
            var count = isObjectEvent ? eventDispatch.getObjectEventHandlerCount(eventType, targetId) : eventDispatch.getEventHandlerCount(eventType);
            if (removeSuccess && count == 0) {
                var invoker = getDelegateMethods(eventType)[OSF.DDA.DispIdHost.Delegates.UnregisterEventAsync];
                invoker({
                    "eventType": eventType,
                    "dispId": dispId,
                    "targetId": targetId,
                    "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
                    "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
                    "onComplete": onEnsureRegistration
                });
            }
            else {
                onEnsureRegistration(status);
            }
        }
        catch (ex) {
            onException(ex, asyncMethodCall, suppliedArguments, callArgs);
        }
    };
    this[OSF.DDA.DispIdHost.Methods.OpenDialog] = function OSF_DDA_DispIdHost_Facade$OpenDialog(suppliedArguments, eventDispatch, caller) {
        var callArgs;
        var targetId;
        var dialogMessageEvent = Microsoft.Office.WebExtension.EventType.DialogMessageReceived;
        var dialogOtherEvent = Microsoft.Office.WebExtension.EventType.DialogEventReceived;
        function onEnsureRegistration(status) {
            var payload;
            if (status != OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                payload = OSF.DDA.ErrorCodeManager.getErrorArgs(status);
            }
            else {
                var onSucceedArgs = {};
                onSucceedArgs[Microsoft.Office.WebExtension.Parameters.Id] = targetId;
                onSucceedArgs[Microsoft.Office.WebExtension.Parameters.Data] = eventDispatch;
                var payload = asyncMethodCall.processResponse(status, onSucceedArgs, caller, callArgs);
                OSF.DialogShownStatus.hasDialogShown = true;
                eventDispatch.clearEventHandlers(dialogMessageEvent);
                eventDispatch.clearEventHandlers(dialogOtherEvent);
            }
            OSF.DDA.issueAsyncResult(callArgs, status, payload);
        }
        try {
            if (dialogMessageEvent == undefined || dialogOtherEvent == undefined) {
                onEnsureRegistration(OSF.DDA.ErrorCodeManager.ooeOperationNotSupported);
            }
            if (OSF.DDA.AsyncMethodNames.DisplayDialogAsync == null) {
                onEnsureRegistration(OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError);
                return;
            }
            var asyncMethodCall = OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.DisplayDialogAsync.id];
            callArgs = asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
            var dispId = dispIdMap[dialogMessageEvent];
            var delegateMethods = getDelegateMethods(dialogMessageEvent);
            var invoker = delegateMethods[OSF.DDA.DispIdHost.Delegates.OpenDialog] != undefined ?
                delegateMethods[OSF.DDA.DispIdHost.Delegates.OpenDialog] :
                delegateMethods[OSF.DDA.DispIdHost.Delegates.RegisterEventAsync];
            targetId = JSON.stringify(callArgs);
            if (!OSF.DialogShownStatus.hasDialogShown) {
                eventDispatch.clearQueuedEvent(dialogMessageEvent);
                eventDispatch.clearQueuedEvent(dialogOtherEvent);
                eventDispatch.clearQueuedEvent(Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived);
            }
            invoker({
                "eventType": dialogMessageEvent,
                "dispId": dispId,
                "targetId": targetId,
                "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
                "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
                "onComplete": onEnsureRegistration,
                "onEvent": function handleEvent(hostArgs) {
                    var args = parameterMap.fromHost(dispId, hostArgs);
                    var event = OSF.DDA.OMFactory.manufactureEventArgs(dialogMessageEvent, caller, args);
                    if (event.type == dialogOtherEvent) {
                        var payload = OSF.DDA.ErrorCodeManager.getErrorArgs(event.error);
                        var errorArgs = {};
                        errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Code] = status || OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
                        errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name] = payload.name || payload;
                        errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message] = payload.message || payload;
                        event.error = new OSF.DDA.Error(errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name], errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message], errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Code]);
                    }
                    eventDispatch.fireOrQueueEvent(event);
                    if (args[OSF.DDA.PropertyDescriptors.MessageType] == OSF.DialogMessageType.DialogClosed) {
                        eventDispatch.clearEventHandlers(dialogMessageEvent);
                        eventDispatch.clearEventHandlers(dialogOtherEvent);
                        eventDispatch.clearEventHandlers(Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived);
                        OSF.DialogShownStatus.hasDialogShown = false;
                    }
                }
            });
        }
        catch (ex) {
            onException(ex, asyncMethodCall, suppliedArguments, callArgs);
        }
    };
    this[OSF.DDA.DispIdHost.Methods.CloseDialog] = function OSF_DDA_DispIdHost_Facade$CloseDialog(suppliedArguments, targetId, eventDispatch, caller) {
        var callArgs;
        var dialogMessageEvent, dialogOtherEvent;
        var closeStatus = OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess;
        function closeCallback(status) {
            closeStatus = status;
            OSF.DialogShownStatus.hasDialogShown = false;
        }
        try {
            var asyncMethodCall = OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.CloseAsync.id];
            callArgs = asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
            dialogMessageEvent = Microsoft.Office.WebExtension.EventType.DialogMessageReceived;
            dialogOtherEvent = Microsoft.Office.WebExtension.EventType.DialogEventReceived;
            eventDispatch.clearEventHandlers(dialogMessageEvent);
            eventDispatch.clearEventHandlers(dialogOtherEvent);
            var dispId = dispIdMap[dialogMessageEvent];
            var delegateMethods = getDelegateMethods(dialogMessageEvent);
            var invoker = delegateMethods[OSF.DDA.DispIdHost.Delegates.CloseDialog] != undefined ?
                delegateMethods[OSF.DDA.DispIdHost.Delegates.CloseDialog] :
                delegateMethods[OSF.DDA.DispIdHost.Delegates.UnregisterEventAsync];
            invoker({
                "eventType": dialogMessageEvent,
                "dispId": dispId,
                "targetId": targetId,
                "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
                "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
                "onComplete": closeCallback
            });
        }
        catch (ex) {
            onException(ex, asyncMethodCall, suppliedArguments, callArgs);
        }
        if (closeStatus != OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
            throw OSF.OUtil.formatString(Strings.OfficeOM.L_FunctionCallFailed, OSF.DDA.AsyncMethodNames.CloseAsync.displayName, closeStatus);
        }
    };
    this[OSF.DDA.DispIdHost.Methods.MessageParent] = function OSF_DDA_DispIdHost_Facade$MessageParent(suppliedArguments, caller) {
        var stateInfo = {};
        var syncMethodCall = OSF.DDA.SyncMethodCalls[OSF.DDA.SyncMethodNames.MessageParent.id];
        var callArgs = syncMethodCall.verifyAndExtractCall(suppliedArguments, caller, stateInfo);
        var delegate = getDelegateMethods(OSF.DDA.SyncMethodNames.MessageParent.id);
        var invoker = delegate[OSF.DDA.DispIdHost.Delegates.MessageParent];
        var dispId = dispIdMap[OSF.DDA.SyncMethodNames.MessageParent.id];
        return invoker({
            "dispId": dispId,
            "hostCallArgs": callArgs,
            "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
            "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); }
        });
    };
    this[OSF.DDA.DispIdHost.Methods.SendMessage] = function OSF_DDA_DispIdHost_Facade$SendMessage(suppliedArguments, eventDispatch, caller) {
        var stateInfo = {};
        var syncMethodCall = OSF.DDA.SyncMethodCalls[OSF.DDA.SyncMethodNames.SendMessage.id];
        var callArgs = syncMethodCall.verifyAndExtractCall(suppliedArguments, caller, stateInfo);
        var delegate = getDelegateMethods(OSF.DDA.SyncMethodNames.SendMessage.id);
        var invoker = delegate[OSF.DDA.DispIdHost.Delegates.SendMessage];
        var dispId = dispIdMap[OSF.DDA.SyncMethodNames.SendMessage.id];
        return invoker({
            "dispId": dispId,
            "hostCallArgs": callArgs,
            "onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
            "onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); }
        });
    };
};
OSF.DDA.DispIdHost.addAsyncMethods = function OSF_DDA_DispIdHost$AddAsyncMethods(target, asyncMethodNames, privateState) {
    for (var entry in asyncMethodNames) {
        var method = asyncMethodNames[entry];
        var name = method.displayName;
        if (!target[name]) {
            OSF.OUtil.defineEnumerableProperty(target, name, {
                value: (function (asyncMethod) {
                    return function () {
                        var invokeMethod = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.InvokeMethod];
                        invokeMethod(asyncMethod, arguments, target, privateState);
                    };
                })(method)
            });
        }
    }
};
OSF.DDA.DispIdHost.addEventSupport = function OSF_DDA_DispIdHost$AddEventSupport(target, eventDispatch, isPopupWindow) {
    var add = OSF.DDA.AsyncMethodNames.AddHandlerAsync.displayName;
    var remove = OSF.DDA.AsyncMethodNames.RemoveHandlerAsync.displayName;
    if (!target[add]) {
        OSF.OUtil.defineEnumerableProperty(target, add, {
            value: function () {
                var addEventHandler = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.AddEventHandler];
                addEventHandler(arguments, eventDispatch, target, isPopupWindow);
            }
        });
    }
    if (!target[remove]) {
        OSF.OUtil.defineEnumerableProperty(target, remove, {
            value: function () {
                var removeEventHandler = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.RemoveEventHandler];
                removeEventHandler(arguments, eventDispatch, target);
            }
        });
    }
};
OSF.OUtil.setNamespace("SafeArray", OSF.DDA);
OSF.DDA.SafeArray.Response = {
    Status: 0,
    Payload: 1
};
OSF.DDA.SafeArray.UniqueArguments = {
    Offset: "offset",
    Run: "run",
    BindingSpecificData: "bindingSpecificData",
    MergedCellGuid: "{66e7831f-81b2-42e2-823c-89e872d541b3}"
};
OSF.OUtil.setNamespace("Delegate", OSF.DDA.SafeArray);
OSF.DDA.SafeArray.Delegate._onException = function OSF_DDA_SafeArray_Delegate$OnException(ex, args) {
    var status;
    var statusNumber = ex.number;
    if (statusNumber) {
        switch (statusNumber) {
            case -2146828218:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeNoCapability;
                break;
            case -2147467259:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeDialogAlreadyOpened;
                break;
            case -2146828283:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidParam;
                break;
            case -2147209089:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidParam;
                break;
            case -2147208704:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeTooManyIncompleteRequests;
                break;
            case -2146827850:
            default:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
                break;
        }
    }
    if (args.onComplete) {
        args.onComplete(status || OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError);
    }
};
OSF.DDA.SafeArray.Delegate._onExceptionSyncMethod = function OSF_DDA_SafeArray_Delegate$OnExceptionSyncMethod(ex, args) {
    var status;
    var number = ex.number;
    if (number) {
        switch (number) {
            case -2146828218:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeNoCapability;
                break;
            case -2146827850:
            default:
                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
                break;
        }
    }
    return status || OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
};
OSF.DDA.SafeArray.Delegate.SpecialProcessor = function OSF_DDA_SafeArray_Delegate_SpecialProcessor() {
    function _2DVBArrayToJaggedArray(vbArr) {
        var ret;
        try {
            var rows = vbArr.ubound(1);
            var cols = vbArr.ubound(2);
            vbArr = vbArr.toArray();
            if (rows == 1 && cols == 1) {
                ret = [vbArr];
            }
            else {
                ret = [];
                for (var row = 0; row < rows; row++) {
                    var rowArr = [];
                    for (var col = 0; col < cols; col++) {
                        var datum = vbArr[row * cols + col];
                        if (datum != OSF.DDA.SafeArray.UniqueArguments.MergedCellGuid) {
                            rowArr.push(datum);
                        }
                    }
                    if (rowArr.length > 0) {
                        ret.push(rowArr);
                    }
                }
            }
        }
        catch (ex) {
        }
        return ret;
    }
    var complexTypes = [];
    var dynamicTypes = {};
    dynamicTypes[Microsoft.Office.WebExtension.Parameters.Data] = (function () {
        var tableRows = 0;
        var tableHeaders = 1;
        return {
            toHost: function OSF_DDA_SafeArray_Delegate_SpecialProcessor_Data$toHost(data) {
                if (OSF.DDA.TableDataProperties && typeof data != "string" && data[OSF.DDA.TableDataProperties.TableRows] !== undefined) {
                    var tableData = [];
                    tableData[tableRows] = data[OSF.DDA.TableDataProperties.TableRows];
                    tableData[tableHeaders] = data[OSF.DDA.TableDataProperties.TableHeaders];
                    data = tableData;
                }
                return data;
            },
            fromHost: function OSF_DDA_SafeArray_Delegate_SpecialProcessor_Data$fromHost(hostArgs) {
                var ret;
                if (hostArgs.toArray) {
                    var dimensions = hostArgs.dimensions();
                    if (dimensions === 2) {
                        ret = _2DVBArrayToJaggedArray(hostArgs);
                    }
                    else {
                        var array = hostArgs.toArray();
                        if (array.length === 2 && ((array[0] != null && array[0].toArray) || (array[1] != null && array[1].toArray))) {
                            ret = {};
                            ret[OSF.DDA.TableDataProperties.TableRows] = _2DVBArrayToJaggedArray(array[tableRows]);
                            ret[OSF.DDA.TableDataProperties.TableHeaders] = _2DVBArrayToJaggedArray(array[tableHeaders]);
                        }
                        else {
                            ret = array;
                        }
                    }
                }
                else {
                    ret = hostArgs;
                }
                return ret;
            }
        };
    })();
    OSF.DDA.SafeArray.Delegate.SpecialProcessor.uber.constructor.call(this, complexTypes, dynamicTypes);
    this.unpack = function OSF_DDA_SafeArray_Delegate_SpecialProcessor$unpack(param, arg) {
        var value;
        if (this.isComplexType(param) || OSF.DDA.ListType.isListType(param)) {
            var toArraySupported = (arg || typeof arg === "unknown") && arg.toArray;
            value = toArraySupported ? arg.toArray() : arg || {};
        }
        else if (this.isDynamicType(param)) {
            value = dynamicTypes[param].fromHost(arg);
        }
        else {
            value = arg;
        }
        return value;
    };
};
OSF.OUtil.extend(OSF.DDA.SafeArray.Delegate.SpecialProcessor, OSF.DDA.SpecialProcessor);
OSF.DDA.SafeArray.Delegate.ParameterMap = OSF.DDA.getDecoratedParameterMap(new OSF.DDA.SafeArray.Delegate.SpecialProcessor(), [
    {
        type: Microsoft.Office.WebExtension.Parameters.ValueFormat,
        toHost: [
            { name: Microsoft.Office.WebExtension.ValueFormat.Unformatted, value: 0 },
            { name: Microsoft.Office.WebExtension.ValueFormat.Formatted, value: 1 }
        ]
    },
    {
        type: Microsoft.Office.WebExtension.Parameters.FilterType,
        toHost: [
            { name: Microsoft.Office.WebExtension.FilterType.All, value: 0 }
        ]
    }
]);
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.PropertyDescriptors.AsyncResultStatus,
    fromHost: [
        { name: Microsoft.Office.WebExtension.AsyncResultStatus.Succeeded, value: 0 },
        { name: Microsoft.Office.WebExtension.AsyncResultStatus.Failed, value: 1 }
    ]
});
OSF.DDA.SafeArray.Delegate.executeAsync = function OSF_DDA_SafeArray_Delegate$ExecuteAsync(args) {
    function toArray(args) {
        var arrArgs = args;
        if (OSF.OUtil.isArray(args)) {
            var len = arrArgs.length;
            for (var i = 0; i < len; i++) {
                arrArgs[i] = toArray(arrArgs[i]);
            }
        }
        else if (OSF.OUtil.isDate(args)) {
            arrArgs = args.getVarDate();
        }
        else if (typeof args === "object" && !OSF.OUtil.isArray(args)) {
            arrArgs = [];
            for (var index in args) {
                if (!OSF.OUtil.isFunction(args[index])) {
                    arrArgs[index] = toArray(args[index]);
                }
            }
        }
        return arrArgs;
    }
    function fromSafeArray(value) {
        var ret = value;
        if (value != null && value.toArray) {
            var arrayResult = value.toArray();
            ret = new Array(arrayResult.length);
            for (var i = 0; i < arrayResult.length; i++) {
                ret[i] = fromSafeArray(arrayResult[i]);
            }
        }
        return ret;
    }
    try {
        if (args.onCalling) {
            args.onCalling();
        }
        OSF.ClientHostController.execute(args.dispId, toArray(args.hostCallArgs), function OSF_DDA_SafeArrayFacade$Execute_OnResponse(hostResponseArgs, resultCode) {
            var result = hostResponseArgs.toArray();
            var status = result[OSF.DDA.SafeArray.Response.Status];
            if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeChunkResult) {
                var payload = result[OSF.DDA.SafeArray.Response.Payload];
                payload = fromSafeArray(payload);
                if (payload != null) {
                    if (!args._chunkResultData) {
                        args._chunkResultData = new Array();
                    }
                    args._chunkResultData[payload[0]] = payload[1];
                }
                return false;
            }
            if (args.onReceiving) {
                args.onReceiving();
            }
            if (args.onComplete) {
                var payload;
                if (status == OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                    if (result.length > 2) {
                        payload = [];
                        for (var i = 1; i < result.length; i++)
                            payload[i - 1] = result[i];
                    }
                    else {
                        payload = result[OSF.DDA.SafeArray.Response.Payload];
                    }
                    if (args._chunkResultData) {
                        payload = fromSafeArray(payload);
                        if (payload != null) {
                            var expectedChunkCount = payload[payload.length - 1];
                            if (args._chunkResultData.length == expectedChunkCount) {
                                payload[payload.length - 1] = args._chunkResultData;
                            }
                            else {
                                status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
                            }
                        }
                    }
                }
                else {
                    payload = result[OSF.DDA.SafeArray.Response.Payload];
                }
                args.onComplete(status, payload);
            }
            return true;
        });
    }
    catch (ex) {
        OSF.DDA.SafeArray.Delegate._onException(ex, args);
    }
};
OSF.DDA.SafeArray.Delegate._getOnAfterRegisterEvent = function OSF_DDA_SafeArrayDelegate$GetOnAfterRegisterEvent(register, args) {
    var startTime = (new Date()).getTime();
    return function OSF_DDA_SafeArrayDelegate$OnAfterRegisterEvent(hostResponseArgs) {
        if (args.onReceiving) {
            args.onReceiving();
        }
        var status = hostResponseArgs.toArray ? hostResponseArgs.toArray()[OSF.DDA.SafeArray.Response.Status] : hostResponseArgs;
        if (args.onComplete) {
            args.onComplete(status);
        }
        if (OSF.AppTelemetry) {
            OSF.AppTelemetry.onRegisterDone(register, args.dispId, Math.abs((new Date()).getTime() - startTime), status);
        }
    };
};
OSF.DDA.SafeArray.Delegate.registerEventAsync = function OSF_DDA_SafeArray_Delegate$RegisterEventAsync(args) {
    if (args.onCalling) {
        args.onCalling();
    }
    var callback = OSF.DDA.SafeArray.Delegate._getOnAfterRegisterEvent(true, args);
    try {
        OSF.ClientHostController.registerEvent(args.dispId, args.targetId, function OSF_DDA_SafeArrayDelegate$RegisterEventAsync_OnEvent(eventDispId, payload) {
            if (args.onEvent) {
                args.onEvent(payload);
            }
            if (OSF.AppTelemetry) {
                OSF.AppTelemetry.onEventDone(args.dispId);
            }
        }, callback);
    }
    catch (ex) {
        OSF.DDA.SafeArray.Delegate._onException(ex, args);
    }
};
OSF.DDA.SafeArray.Delegate.unregisterEventAsync = function OSF_DDA_SafeArray_Delegate$UnregisterEventAsync(args) {
    if (args.onCalling) {
        args.onCalling();
    }
    var callback = OSF.DDA.SafeArray.Delegate._getOnAfterRegisterEvent(false, args);
    try {
        OSF.ClientHostController.unregisterEvent(args.dispId, args.targetId, callback);
    }
    catch (ex) {
        OSF.DDA.SafeArray.Delegate._onException(ex, args);
    }
};
OSF.ClientMode = {
    ReadWrite: 0,
    ReadOnly: 1
};
OSF.DDA.RichInitializationReason = {
    1: Microsoft.Office.WebExtension.InitializationReason.Inserted,
    2: Microsoft.Office.WebExtension.InitializationReason.DocumentOpened
};
OSF.InitializationHelper = function OSF_InitializationHelper(hostInfo, webAppState, context, settings, hostFacade) {
    this._hostInfo = hostInfo;
    this._webAppState = webAppState;
    this._context = context;
    this._settings = settings;
    this._hostFacade = hostFacade;
    this._initializeSettings = this.initializeSettings;
};
OSF.InitializationHelper.prototype.deserializeSettings = function OSF_InitializationHelper$deserializeSettings(serializedSettings, refreshSupported) {
    var settings;
    var osfSessionStorage = OSF.OUtil.getSessionStorage();
    if (osfSessionStorage) {
        var storageSettings = osfSessionStorage.getItem(OSF._OfficeAppFactory.getCachedSessionSettingsKey());
        if (storageSettings) {
            serializedSettings = JSON.parse(storageSettings);
        }
        else {
            storageSettings = JSON.stringify(serializedSettings);
            osfSessionStorage.setItem(OSF._OfficeAppFactory.getCachedSessionSettingsKey(), storageSettings);
        }
    }
    var deserializedSettings = OSF.DDA.SettingsManager.deserializeSettings(serializedSettings);
    if (refreshSupported) {
        settings = new OSF.DDA.RefreshableSettings(deserializedSettings);
    }
    else {
        settings = new OSF.DDA.Settings(deserializedSettings);
    }
    return settings;
};
OSF.InitializationHelper.prototype.saveAndSetDialogInfo = function OSF_InitializationHelper$saveAndSetDialogInfo(hostInfoValue) {
};
OSF.InitializationHelper.prototype.setAgaveHostCommunication = function OSF_InitializationHelper$setAgaveHostCommunication() {
};
OSF.InitializationHelper.prototype.prepareRightBeforeWebExtensionInitialize = function OSF_InitializationHelper$prepareRightBeforeWebExtensionInitialize(appContext) {
    this.prepareApiSurface(appContext);
    Microsoft.Office.WebExtension.initialize(this.getInitializationReason(appContext));
};
OSF.InitializationHelper.prototype.prepareApiSurface = function OSF_InitializationHelper$prepareApiSurfaceAndInitialize(appContext) {
    var license = new OSF.DDA.License(appContext.get_eToken());
    var getOfficeThemeHandler = (OSF.DDA.OfficeTheme && OSF.DDA.OfficeTheme.getOfficeTheme) ? OSF.DDA.OfficeTheme.getOfficeTheme : null;
    if (appContext.get_isDialog()) {
        if (OSF.DDA.UI.ChildUI) {
            appContext.ui = new OSF.DDA.UI.ChildUI();
        }
    }
    else {
        if (OSF.DDA.UI.ParentUI) {
            appContext.ui = new OSF.DDA.UI.ParentUI();
            if (OfficeExt.Container) {
                OSF.DDA.DispIdHost.addAsyncMethods(appContext.ui, [OSF.DDA.AsyncMethodNames.CloseContainerAsync]);
            }
        }
    }
    if (OSF.DDA.OpenBrowser) {
        OSF.DDA.DispIdHost.addAsyncMethods(appContext.ui, [OSF.DDA.AsyncMethodNames.OpenBrowserWindow]);
    }
    if (OSF.DDA.ExecuteFeature) {
        OSF.DDA.DispIdHost.addAsyncMethods(appContext.ui, [OSF.DDA.AsyncMethodNames.ExecuteFeature]);
    }
    if (OSF.DDA.QueryFeature) {
        OSF.DDA.DispIdHost.addAsyncMethods(appContext.ui, [OSF.DDA.AsyncMethodNames.QueryFeature]);
    }
    if (OSF.DDA.Auth) {
        appContext.auth = new OSF.DDA.Auth();
        OSF.DDA.DispIdHost.addAsyncMethods(appContext.auth, [OSF.DDA.AsyncMethodNames.GetAccessTokenAsync]);
    }
    OSF._OfficeAppFactory.setContext(new OSF.DDA.Context(appContext, appContext.doc, license, null, getOfficeThemeHandler));
    var getDelegateMethods, parameterMap;
    getDelegateMethods = OSF.DDA.DispIdHost.getClientDelegateMethods;
    parameterMap = OSF.DDA.SafeArray.Delegate.ParameterMap;
    OSF._OfficeAppFactory.setHostFacade(new OSF.DDA.DispIdHost.Facade(getDelegateMethods, parameterMap));
};
OSF.InitializationHelper.prototype.getInitializationReason = function (appContext) { return OSF.DDA.RichInitializationReason[appContext.get_reason()]; };
OSF.DDA.DispIdHost.getClientDelegateMethods = function (actionId) {
    var delegateMethods = {};
    delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync] = OSF.DDA.SafeArray.Delegate.executeAsync;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.RegisterEventAsync] = OSF.DDA.SafeArray.Delegate.registerEventAsync;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.UnregisterEventAsync] = OSF.DDA.SafeArray.Delegate.unregisterEventAsync;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.OpenDialog] = OSF.DDA.SafeArray.Delegate.openDialog;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.CloseDialog] = OSF.DDA.SafeArray.Delegate.closeDialog;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.MessageParent] = OSF.DDA.SafeArray.Delegate.messageParent;
    delegateMethods[OSF.DDA.DispIdHost.Delegates.SendMessage] = OSF.DDA.SafeArray.Delegate.sendMessage;
    if (OSF.DDA.AsyncMethodNames.RefreshAsync && actionId == OSF.DDA.AsyncMethodNames.RefreshAsync.id) {
        var readSerializedSettings = function (hostCallArgs, onCalling, onReceiving) {
            return OSF.DDA.ClientSettingsManager.read(onCalling, onReceiving);
        };
        delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync] = OSF.DDA.ClientSettingsManager.getSettingsExecuteMethod(readSerializedSettings);
    }
    if (OSF.DDA.AsyncMethodNames.SaveAsync && actionId == OSF.DDA.AsyncMethodNames.SaveAsync.id) {
        var writeSerializedSettings = function (hostCallArgs, onCalling, onReceiving) {
            return OSF.DDA.ClientSettingsManager.write(hostCallArgs[OSF.DDA.SettingsManager.SerializedSettings], hostCallArgs[Microsoft.Office.WebExtension.Parameters.OverwriteIfStale], onCalling, onReceiving);
        };
        delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync] = OSF.DDA.ClientSettingsManager.getSettingsExecuteMethod(writeSerializedSettings);
    }
    return delegateMethods;
};
var OfficeExt;
(function (OfficeExt) {
    var RichClientHostController = (function () {
        function RichClientHostController() {
        }
        RichClientHostController.prototype.execute = function (id, params, callback) {
            if (typeof OsfOMToken != 'undefined' && OsfOMToken) {
                window.external.Execute(id, params, callback, OsfOMToken);
            }
            else {
                window.external.Execute(id, params, callback);
            }
        };
        RichClientHostController.prototype.registerEvent = function (id, targetId, handler, callback) {
            if (typeof OsfOMToken != 'undefined' && OsfOMToken) {
                window.external.RegisterEvent(id, targetId, handler, callback, OsfOMToken);
            }
            else {
                window.external.RegisterEvent(id, targetId, handler, callback);
            }
        };
        RichClientHostController.prototype.unregisterEvent = function (id, targetId, callback) {
            if (typeof OsfOMToken != 'undefined' && OsfOMToken) {
                window.external.UnregisterEvent(id, targetId, callback, OsfOMToken);
            }
            else {
                window.external.UnregisterEvent(id, targetId, callback);
            }
        };
        return RichClientHostController;
    })();
    OfficeExt.RichClientHostController = RichClientHostController;
})(OfficeExt || (OfficeExt = {}));
var OfficeExt;
(function (OfficeExt) {
    var Win32RichClientHostController = (function (_super) {
        __extends(Win32RichClientHostController, _super);
        function Win32RichClientHostController() {
            _super.apply(this, arguments);
        }
        Win32RichClientHostController.prototype.messageParent = function (params) {
            var message = params[Microsoft.Office.WebExtension.Parameters.MessageToParent];
            window.external.MessageParent(message);
        };
        Win32RichClientHostController.prototype.openDialog = function (id, targetId, handler, callback) {
            this.registerEvent(id, targetId, handler, callback);
        };
        Win32RichClientHostController.prototype.closeDialog = function (id, targetId, callback) {
            this.unregisterEvent(id, targetId, callback);
        };
        Win32RichClientHostController.prototype.sendMessage = function (params) {
        };
        return Win32RichClientHostController;
    })(OfficeExt.RichClientHostController);
    OfficeExt.Win32RichClientHostController = Win32RichClientHostController;
})(OfficeExt || (OfficeExt = {}));
var OfficeExt;
(function (OfficeExt) {
    var OfficeTheme;
    (function (OfficeTheme) {
        var OfficeThemeManager = (function () {
            function OfficeThemeManager() {
                this._osfOfficeTheme = null;
                this._osfOfficeThemeTimeStamp = null;
            }
            OfficeThemeManager.prototype.getOfficeTheme = function () {
                if (OSF.DDA._OsfControlContext) {
                    if (this._osfOfficeTheme && this._osfOfficeThemeTimeStamp && ((new Date()).getTime() - this._osfOfficeThemeTimeStamp < OfficeThemeManager._osfOfficeThemeCacheValidPeriod)) {
                        if (OSF.AppTelemetry) {
                            OSF.AppTelemetry.onPropertyDone("GetOfficeThemeInfo", 0);
                        }
                    }
                    else {
                        var startTime = (new Date()).getTime();
                        var osfOfficeTheme = OSF.DDA._OsfControlContext.GetOfficeThemeInfo();
                        var endTime = (new Date()).getTime();
                        if (OSF.AppTelemetry) {
                            OSF.AppTelemetry.onPropertyDone("GetOfficeThemeInfo", Math.abs(endTime - startTime));
                        }
                        this._osfOfficeTheme = JSON.parse(osfOfficeTheme);
                        for (var color in this._osfOfficeTheme) {
                            this._osfOfficeTheme[color] = OSF.OUtil.convertIntToCssHexColor(this._osfOfficeTheme[color]);
                        }
                        this._osfOfficeThemeTimeStamp = endTime;
                    }
                    return this._osfOfficeTheme;
                }
            };
            OfficeThemeManager.instance = function () {
                if (OfficeThemeManager._instance == null) {
                    OfficeThemeManager._instance = new OfficeThemeManager();
                }
                return OfficeThemeManager._instance;
            };
            OfficeThemeManager._osfOfficeThemeCacheValidPeriod = 5000;
            OfficeThemeManager._instance = null;
            return OfficeThemeManager;
        })();
        OfficeTheme.OfficeThemeManager = OfficeThemeManager;
        OSF.OUtil.setNamespace("OfficeTheme", OSF.DDA);
        OSF.DDA.OfficeTheme.getOfficeTheme = OfficeExt.OfficeTheme.OfficeThemeManager.instance().getOfficeTheme;
    })(OfficeTheme = OfficeExt.OfficeTheme || (OfficeExt.OfficeTheme = {}));
})(OfficeExt || (OfficeExt = {}));
OSF.initializeRichCommon = function OSF_initializeRichCommon() {
    OSF.DDA.ClientSettingsManager = {
        getSettingsExecuteMethod: function OSF_DDA_ClientSettingsManager$getSettingsExecuteMethod(hostDelegateMethod) {
            return function (args) {
                var status, response;
                try {
                    response = hostDelegateMethod(args.hostCallArgs, args.onCalling, args.onReceiving);
                    status = OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess;
                }
                catch (ex) {
                    status = OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
                    response = { name: Strings.OfficeOM.L_InternalError, message: ex };
                }
                if (args.onComplete) {
                    args.onComplete(status, response);
                }
            };
        },
        read: function OSF_DDA_ClientSettingsManager$read(onCalling, onReceiving) {
            var keys = [];
            var values = [];
            if (onCalling) {
                onCalling();
            }
            if (typeof OsfOMToken != 'undefined' && OsfOMToken) {
                OSF.DDA._OsfControlContext.GetSettings(OsfOMToken).Read(keys, values);
            }
            else {
                OSF.DDA._OsfControlContext.GetSettings().Read(keys, values);
            }
            if (onReceiving) {
                onReceiving();
            }
            var serializedSettings = {};
            for (var index = 0; index < keys.length; index++) {
                serializedSettings[keys[index]] = values[index];
            }
            return serializedSettings;
        },
        write: function OSF_DDA_ClientSettingsManager$write(serializedSettings, overwriteIfStale, onCalling, onReceiving) {
            var keys = [];
            var values = [];
            for (var key in serializedSettings) {
                keys.push(key);
                values.push(serializedSettings[key]);
            }
            if (onCalling) {
                onCalling();
            }
            if (typeof OsfOMToken != 'undefined' && OsfOMToken) {
                OSF.DDA._OsfControlContext.GetSettings(OsfOMToken).Write(keys, values);
            }
            else {
                OSF.DDA._OsfControlContext.GetSettings().Write(keys, values);
            }
            if (onReceiving) {
                onReceiving();
            }
        }
    };
    OSF.InitializationHelper.prototype.initializeSettings = function OSF_InitializationHelper$initializeSettings(refreshSupported) {
        var serializedSettings = OSF.DDA.ClientSettingsManager.read();
        var settings = this.deserializeSettings(serializedSettings, refreshSupported);
        return settings;
    };
    OSF.InitializationHelper.prototype.getAppContext = function OSF_InitializationHelper$getAppContext(wnd, gotAppContext) {
        var returnedContext;
        var context;
        var warningText = "Warning: Office.js is loaded outside of Office client";
        try {
            if (window.external && typeof window.external.GetContext !== 'undefined') {
                context = OSF.DDA._OsfControlContext = window.external.GetContext();
            }
            else {
                OsfMsAjaxFactory.msAjaxDebug.trace(warningText);
                return;
            }
        }
        catch (e) {
            OsfMsAjaxFactory.msAjaxDebug.trace(warningText);
            return;
        }
        var appType = context.GetAppType();
        var id = context.GetSolutionRef();
        var version = context.GetAppVersionMajor();
        var minorVersion = context.GetAppVersionMinor();
        var UILocale = context.GetAppUILocale();
        var dataLocale = context.GetAppDataLocale();
        var docUrl = context.GetDocUrl();
        var clientMode = context.GetAppCapabilities();
        var reason = context.GetActivationMode();
        var osfControlType = context.GetControlIntegrationLevel();
        var settings = [];
        var eToken;
        try {
            eToken = context.GetSolutionToken();
        }
        catch (ex) {
        }
        var correlationId;
        if (typeof context.GetCorrelationId !== "undefined") {
            correlationId = context.GetCorrelationId();
        }
        var appInstanceId;
        if (typeof context.GetInstanceId !== "undefined") {
            appInstanceId = context.GetInstanceId();
        }
        var touchEnabled;
        if (typeof context.GetTouchEnabled !== "undefined") {
            touchEnabled = context.GetTouchEnabled();
        }
        var commerceAllowed;
        if (typeof context.GetCommerceAllowed !== "undefined") {
            commerceAllowed = context.GetCommerceAllowed();
        }
        var requirementMatrix;
        if (typeof context.GetSupportedMatrix !== "undefined") {
            requirementMatrix = context.GetSupportedMatrix();
        }
        var hostCustomMessage;
        if (typeof context.GetHostCustomMessage !== "undefined") {
            hostCustomMessage = context.GetHostCustomMessage();
        }
        var hostFullVersion;
        if (typeof context.GetHostFullVersion !== "undefined") {
            hostFullVersion = context.GetHostFullVersion();
        }
        var dialogRequirementMatrix;
        if (typeof context.GetDialogRequirementMatrix != "undefined") {
            dialogRequirementMatrix = context.GetDialogRequirementMatrix();
        }
        eToken = eToken ? eToken.toString() : "";
        returnedContext = new OSF.OfficeAppContext(id, appType, version, UILocale, dataLocale, docUrl, clientMode, settings, reason, osfControlType, eToken, correlationId, appInstanceId, touchEnabled, commerceAllowed, minorVersion, requirementMatrix, hostCustomMessage, hostFullVersion, undefined, undefined, undefined, dialogRequirementMatrix);
        if (OSF.AppTelemetry) {
            OSF.AppTelemetry.initialize(returnedContext);
        }
        gotAppContext(returnedContext);
    };
};
OSF.ClientHostController = new OfficeExt.Win32RichClientHostController();
OSF.initializeRichCommon();
(function () {
    var checkScriptOverride = function OSF$checkScriptOverride() {
        var postScriptOverrideCheckAction = function OSF$postScriptOverrideCheckAction(customizedScriptPath) {
            if (customizedScriptPath) {
                OSF.OUtil.loadScript(customizedScriptPath, function () {
                    OsfMsAjaxFactory.msAjaxDebug.trace("loaded customized script:" + customizedScriptPath);
                });
            }
        };
        var conversationID, webAppUrl, items;
        var clientEndPoint = null;
        var xdmInfoValue = OSF.OUtil.parseXdmInfo();
        if (xdmInfoValue) {
            items = OSF.OUtil.getInfoItems(xdmInfoValue);
            if (items && items.length >= 3) {
                conversationID = items[0];
                webAppUrl = items[2];
                var serializerVersion = OSF.OUtil.parseSerializerVersionWithGivenFragment(false, OSF._OfficeAppFactory.getWindowLocationHash());
                if (isNaN(serializerVersion) && OSF._OfficeAppFactory.getWindowName) {
                    serializerVersion = OSF.OUtil.parseSerializerVersionFromWindowName(false, OSF._OfficeAppFactory.getWindowName());
                }
                clientEndPoint = Microsoft.Office.Common.XdmCommunicationManager.connect(conversationID, window.parent, webAppUrl, serializerVersion);
            }
        }
        var customizedScriptPath = null;
        if (!clientEndPoint) {
            try {
                if (window.external && typeof window.external.getCustomizedScriptPath !== 'undefined') {
                    customizedScriptPath = window.external.getCustomizedScriptPath();
                }
            }
            catch (ex) {
                OsfMsAjaxFactory.msAjaxDebug.trace("no script override through window.external.");
            }
            postScriptOverrideCheckAction(customizedScriptPath);
        }
        else {
            try {
                clientEndPoint.invoke("getCustomizedScriptPathAsync", function OSF$getCustomizedScriptPathAsyncCallback(errorCode, scriptPath) {
                    postScriptOverrideCheckAction(errorCode === 0 ? scriptPath : null);
                }, { __timeout__: 1000 });
            }
            catch (ex) {
                OsfMsAjaxFactory.msAjaxDebug.trace("no script override through cross frame communication.");
            }
        }
    };
    var requiresMsAjax = true;
    if (requiresMsAjax && !OsfMsAjaxFactory.isMsAjaxLoaded()) {
        if (!(OSF._OfficeAppFactory && OSF._OfficeAppFactory && OSF._OfficeAppFactory.getLoadScriptHelper && OSF._OfficeAppFactory.getLoadScriptHelper().isScriptLoading(OSF.ConstantNames.MicrosoftAjaxId))) {
            OsfMsAjaxFactory.loadMsAjaxFull(function OSF$loadMSAjaxCallback() {
                if (OsfMsAjaxFactory.isMsAjaxLoaded()) {
                    checkScriptOverride();
                }
                else {
                    throw 'Not able to load MicrosoftAjax.js.';
                }
            });
        }
        else {
            OSF._OfficeAppFactory.getLoadScriptHelper().waitForScripts([OSF.ConstantNames.MicrosoftAjaxId], checkScriptOverride);
        }
    }
    else {
        checkScriptOverride();
    }
})();
Microsoft.Office.WebExtension.EventType = {};
OSF.EventDispatch = function OSF_EventDispatch(eventTypes) {
    this._eventHandlers = {};
    this._objectEventHandlers = {};
    this._queuedEventsArgs = {};
    if (eventTypes != null) {
        for (var i = 0; i < eventTypes.length; i++) {
            var eventType = eventTypes[i];
            var isObjectEvent = (eventType == "objectDeleted" || eventType == "objectSelectionChanged" || eventType == "objectDataChanged" || eventType == "contentControlAdded");
            if (!isObjectEvent)
                this._eventHandlers[eventType] = [];
            else
                this._objectEventHandlers[eventType] = {};
            this._queuedEventsArgs[eventType] = [];
        }
    }
};
OSF.EventDispatch.prototype = {
    getSupportedEvents: function OSF_EventDispatch$getSupportedEvents() {
        var events = [];
        for (var eventName in this._eventHandlers)
            events.push(eventName);
        for (var eventName in this._objectEventHandlers)
            events.push(eventName);
        return events;
    },
    supportsEvent: function OSF_EventDispatch$supportsEvent(event) {
        for (var eventName in this._eventHandlers) {
            if (event == eventName)
                return true;
        }
        for (var eventName in this._objectEventHandlers) {
            if (event == eventName)
                return true;
        }
        return false;
    },
    hasEventHandler: function OSF_EventDispatch$hasEventHandler(eventType, handler) {
        var handlers = this._eventHandlers[eventType];
        if (handlers && handlers.length > 0) {
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler)
                    return true;
            }
        }
        return false;
    },
    hasObjectEventHandler: function OSF_EventDispatch$hasObjectEventHandler(eventType, objectId, handler) {
        var handlers = this._objectEventHandlers[eventType];
        if (handlers != null) {
            var _handlers = handlers[objectId];
            for (var i = 0; _handlers != null && i < _handlers.length; i++) {
                if (_handlers[i] === handler)
                    return true;
            }
        }
        return false;
    },
    addEventHandler: function OSF_EventDispatch$addEventHandler(eventType, handler) {
        if (typeof handler != "function") {
            return false;
        }
        var handlers = this._eventHandlers[eventType];
        if (handlers && !this.hasEventHandler(eventType, handler)) {
            handlers.push(handler);
            return true;
        }
        else {
            return false;
        }
    },
    addObjectEventHandler: function OSF_EventDispatch$addObjectEventHandler(eventType, objectId, handler) {
        if (typeof handler != "function") {
            return false;
        }
        var handlers = this._objectEventHandlers[eventType];
        if (handlers && !this.hasObjectEventHandler(eventType, objectId, handler)) {
            if (handlers[objectId] == null)
                handlers[objectId] = [];
            handlers[objectId].push(handler);
            return true;
        }
        return false;
    },
    addEventHandlerAndFireQueuedEvent: function OSF_EventDispatch$addEventHandlerAndFireQueuedEvent(eventType, handler) {
        var handlers = this._eventHandlers[eventType];
        var isFirstHandler = handlers.length == 0;
        var succeed = this.addEventHandler(eventType, handler);
        if (isFirstHandler && succeed) {
            this.fireQueuedEvent(eventType);
        }
        return succeed;
    },
    removeEventHandler: function OSF_EventDispatch$removeEventHandler(eventType, handler) {
        var handlers = this._eventHandlers[eventType];
        if (handlers && handlers.length > 0) {
            for (var index = 0; index < handlers.length; index++) {
                if (handlers[index] === handler) {
                    handlers.splice(index, 1);
                    return true;
                }
            }
        }
        return false;
    },
    removeObjectEventHandler: function OSF_EventDispatch$removeObjectEventHandler(eventType, objectId, handler) {
        var handlers = this._objectEventHandlers[eventType];
        if (handlers != null) {
            var _handlers = handlers[objectId];
            for (var i = 0; _handlers != null && i < _handlers.length; i++) {
                if (_handlers[i] === handler) {
                    _handlers.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    },
    clearEventHandlers: function OSF_EventDispatch$clearEventHandlers(eventType) {
        if (typeof this._eventHandlers[eventType] != "undefined" && this._eventHandlers[eventType].length > 0) {
            this._eventHandlers[eventType] = [];
            return true;
        }
        return false;
    },
    clearObjectEventHandlers: function OSF_EventDispatch$clearObjectEventHandlers(eventType, objectId) {
        if (this._objectEventHandlers[eventType] != null && this._objectEventHandlers[eventType][objectId] != null) {
            this._objectEventHandlers[eventType][objectId] = [];
            return true;
        }
        return false;
    },
    getEventHandlerCount: function OSF_EventDispatch$getEventHandlerCount(eventType) {
        return this._eventHandlers[eventType] != undefined ? this._eventHandlers[eventType].length : -1;
    },
    getObjectEventHandlerCount: function OSF_EventDispatch$getObjectEventHandlerCount(eventType, objectId) {
        if (this._objectEventHandlers[eventType] == null || this._objectEventHandlers[eventType][objectId] == null)
            return 0;
        return this._objectEventHandlers[eventType][objectId].length;
    },
    fireEvent: function OSF_EventDispatch$fireEvent(eventArgs) {
        if (eventArgs.type == undefined)
            return false;
        var eventType = eventArgs.type;
        if (eventType && this._eventHandlers[eventType]) {
            var eventHandlers = this._eventHandlers[eventType];
            for (var i = 0; i < eventHandlers.length; i++) {
                eventHandlers[i](eventArgs);
            }
            return true;
        }
        else {
            return false;
        }
    },
    fireObjectEvent: function OSF_EventDispatch$fireObjectEvent(objectId, eventArgs) {
        if (eventArgs.type == undefined)
            return false;
        var eventType = eventArgs.type;
        if (eventType && this._objectEventHandlers[eventType]) {
            var eventHandlers = this._objectEventHandlers[eventType];
            var _handlers = eventHandlers[objectId];
            if (_handlers != null) {
                for (var i = 0; i < _handlers.length; i++)
                    _handlers[i](eventArgs);
                return true;
            }
        }
        return false;
    },
    fireOrQueueEvent: function OSF_EventDispatch$fireOrQueueEvent(eventArgs) {
        var eventType = eventArgs.type;
        if (eventType && this._eventHandlers[eventType]) {
            var eventHandlers = this._eventHandlers[eventType];
            var queuedEvents = this._queuedEventsArgs[eventType];
            if (eventHandlers.length == 0) {
                queuedEvents.push(eventArgs);
            }
            else {
                this.fireEvent(eventArgs);
            }
            return true;
        }
        else {
            return false;
        }
    },
    fireQueuedEvent: function OSF_EventDispatch$queueEvent(eventType) {
        if (eventType && this._eventHandlers[eventType]) {
            var eventHandlers = this._eventHandlers[eventType];
            var queuedEvents = this._queuedEventsArgs[eventType];
            if (eventHandlers.length > 0) {
                var eventHandler = eventHandlers[0];
                while (queuedEvents.length > 0) {
                    var eventArgs = queuedEvents.shift();
                    eventHandler(eventArgs);
                }
                return true;
            }
        }
        return false;
    },
    clearQueuedEvent: function OSF_EventDispatch$clearQueuedEvent(eventType) {
        if (eventType && this._eventHandlers[eventType]) {
            var queuedEvents = this._queuedEventsArgs[eventType];
            if (queuedEvents) {
                this._queuedEventsArgs[eventType] = [];
            }
        }
    }
};
OSF.DDA.OMFactory = OSF.DDA.OMFactory || {};
OSF.DDA.OMFactory.manufactureEventArgs = function OSF_DDA_OMFactory$manufactureEventArgs(eventType, target, eventProperties) {
    var args;
    switch (eventType) {
        case Microsoft.Office.WebExtension.EventType.DocumentSelectionChanged:
            args = new OSF.DDA.DocumentSelectionChangedEventArgs(target);
            break;
        case Microsoft.Office.WebExtension.EventType.BindingSelectionChanged:
            args = new OSF.DDA.BindingSelectionChangedEventArgs(this.manufactureBinding(eventProperties, target.document), eventProperties[OSF.DDA.PropertyDescriptors.Subset]);
            break;
        case Microsoft.Office.WebExtension.EventType.BindingDataChanged:
            args = new OSF.DDA.BindingDataChangedEventArgs(this.manufactureBinding(eventProperties, target.document));
            break;
        case Microsoft.Office.WebExtension.EventType.SettingsChanged:
            args = new OSF.DDA.SettingsChangedEventArgs(target);
            break;
        case Microsoft.Office.WebExtension.EventType.ActiveViewChanged:
            args = new OSF.DDA.ActiveViewChangedEventArgs(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.OfficeThemeChanged:
            args = new OSF.DDA.Theming.OfficeThemeChangedEventArgs(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.DocumentThemeChanged:
            args = new OSF.DDA.Theming.DocumentThemeChangedEventArgs(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.AppCommandInvoked:
            args = OSF.DDA.AppCommand.AppCommandInvokedEventArgs.create(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.ObjectDeleted:
        case Microsoft.Office.WebExtension.EventType.ObjectSelectionChanged:
        case Microsoft.Office.WebExtension.EventType.ObjectDataChanged:
        case Microsoft.Office.WebExtension.EventType.ContentControlAdded:
            args = new OSF.DDA.ObjectEventArgs(eventType, eventProperties[Microsoft.Office.WebExtension.Parameters.Id]);
            break;
        case Microsoft.Office.WebExtension.EventType.RichApiMessage:
            args = new OSF.DDA.RichApiMessageEventArgs(eventType, eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.DataNodeInserted:
            args = new OSF.DDA.NodeInsertedEventArgs(this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NewNode]), eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]);
            break;
        case Microsoft.Office.WebExtension.EventType.DataNodeReplaced:
            args = new OSF.DDA.NodeReplacedEventArgs(this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.OldNode]), this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NewNode]), eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]);
            break;
        case Microsoft.Office.WebExtension.EventType.DataNodeDeleted:
            args = new OSF.DDA.NodeDeletedEventArgs(this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.OldNode]), this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NextSiblingNode]), eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]);
            break;
        case Microsoft.Office.WebExtension.EventType.TaskSelectionChanged:
            args = new OSF.DDA.TaskSelectionChangedEventArgs(target);
            break;
        case Microsoft.Office.WebExtension.EventType.ResourceSelectionChanged:
            args = new OSF.DDA.ResourceSelectionChangedEventArgs(target);
            break;
        case Microsoft.Office.WebExtension.EventType.ViewSelectionChanged:
            args = new OSF.DDA.ViewSelectionChangedEventArgs(target);
            break;
        case Microsoft.Office.WebExtension.EventType.DialogMessageReceived:
            args = new OSF.DDA.DialogEventArgs(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived:
            args = new OSF.DDA.DialogParentEventArgs(eventProperties);
            break;
        case Microsoft.Office.WebExtension.EventType.ItemChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkItemSelectedChangedEventArgs(eventProperties);
                target.initialize(args["initialData"]);
                if (OSF._OfficeAppFactory.getHostInfo()["hostPlatform"] == "win32" || OSF._OfficeAppFactory.getHostInfo()["hostPlatform"] == "mac") {
                    target.setCurrentItemNumber(args["itemNumber"].itemNumber);
                }
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.RecipientsChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkRecipientsChangedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.AppointmentTimeChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkAppointmentTimeChangedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.RecurrenceChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkRecurrenceChangedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.AttachmentsChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkAttachmentsChangedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.EnhancedLocationsChanged:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkEnhancedLocationsChangedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        case Microsoft.Office.WebExtension.EventType.InfobarClicked:
            if (OSF._OfficeAppFactory.getHostInfo()["hostType"] == "outlook") {
                args = new OSF.DDA.OlkInfobarClickedEventArgs(eventProperties);
            }
            else {
                throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
            }
            break;
        default:
            throw OsfMsAjaxFactory.msAjaxError.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
    }
    return args;
};
OSF.DDA.AsyncMethodNames.addNames({
    AddHandlerAsync: "addHandlerAsync",
    RemoveHandlerAsync: "removeHandlerAsync"
});
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.AddHandlerAsync,
    requiredArguments: [{
            "name": Microsoft.Office.WebExtension.Parameters.EventType,
            "enum": Microsoft.Office.WebExtension.EventType,
            "verify": function (eventType, caller, eventDispatch) { return eventDispatch.supportsEvent(eventType); }
        },
        {
            "name": Microsoft.Office.WebExtension.Parameters.Handler,
            "types": ["function"]
        }
    ],
    supportedOptions: [],
    privateStateCallbacks: []
});
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.RemoveHandlerAsync,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.EventType,
            "enum": Microsoft.Office.WebExtension.EventType,
            "verify": function (eventType, caller, eventDispatch) { return eventDispatch.supportsEvent(eventType); }
        }
    ],
    supportedOptions: [
        {
            name: Microsoft.Office.WebExtension.Parameters.Handler,
            value: {
                "types": ["function", "object"],
                "defaultValue": null
            }
        }
    ],
    privateStateCallbacks: []
});
OSF.DialogShownStatus = { hasDialogShown: false, isWindowDialog: false };
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, {
    DialogMessageReceivedEvent: "DialogMessageReceivedEvent"
});
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, {
    DialogMessageReceived: "dialogMessageReceived",
    DialogEventReceived: "dialogEventReceived"
});
OSF.OUtil.augmentList(OSF.DDA.PropertyDescriptors, {
    MessageType: "messageType",
    MessageContent: "messageContent"
});
OSF.DDA.DialogEventType = {};
OSF.OUtil.augmentList(OSF.DDA.DialogEventType, {
    DialogClosed: "dialogClosed",
    NavigationFailed: "naviationFailed"
});
OSF.DDA.AsyncMethodNames.addNames({
    DisplayDialogAsync: "displayDialogAsync",
    CloseAsync: "close"
});
OSF.DDA.SyncMethodNames.addNames({
    MessageParent: "messageParent",
    AddMessageHandler: "addEventHandler",
    SendMessage: "sendMessage"
});
OSF.DDA.UI.ParentUI = function OSF_DDA_ParentUI() {
    var eventDispatch;
    if (Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived != null) {
        eventDispatch = new OSF.EventDispatch([
            Microsoft.Office.WebExtension.EventType.DialogMessageReceived,
            Microsoft.Office.WebExtension.EventType.DialogEventReceived,
            Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived
        ]);
    }
    else {
        eventDispatch = new OSF.EventDispatch([
            Microsoft.Office.WebExtension.EventType.DialogMessageReceived,
            Microsoft.Office.WebExtension.EventType.DialogEventReceived
        ]);
    }
    var openDialogName = OSF.DDA.AsyncMethodNames.DisplayDialogAsync.displayName;
    var target = this;
    if (!target[openDialogName]) {
        OSF.OUtil.defineEnumerableProperty(target, openDialogName, {
            value: function () {
                var openDialog = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.OpenDialog];
                openDialog(arguments, eventDispatch, target);
            }
        });
    }
    OSF.OUtil.finalizeProperties(this);
};
OSF.DDA.UI.ChildUI = function OSF_DDA_ChildUI(isPopupWindow) {
    var messageParentName = OSF.DDA.SyncMethodNames.MessageParent.displayName;
    var target = this;
    if (!target[messageParentName]) {
        OSF.OUtil.defineEnumerableProperty(target, messageParentName, {
            value: function () {
                var messageParent = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.MessageParent];
                return messageParent(arguments, target);
            }
        });
    }
    var addEventHandler = OSF.DDA.SyncMethodNames.AddMessageHandler.displayName;
    if (!target[addEventHandler] && typeof OSF.DialogParentMessageEventDispatch != "undefined") {
        OSF.DDA.DispIdHost.addEventSupport(target, OSF.DialogParentMessageEventDispatch, isPopupWindow);
    }
    OSF.OUtil.finalizeProperties(this);
};
OSF.DialogHandler = function OSF_DialogHandler() { };
OSF.DDA.DialogEventArgs = function OSF_DDA_DialogEventArgs(message) {
    if (message[OSF.DDA.PropertyDescriptors.MessageType] == OSF.DialogMessageType.DialogMessageReceived) {
        OSF.OUtil.defineEnumerableProperties(this, {
            "type": {
                value: Microsoft.Office.WebExtension.EventType.DialogMessageReceived
            },
            "message": {
                value: message[OSF.DDA.PropertyDescriptors.MessageContent]
            }
        });
    }
    else {
        OSF.OUtil.defineEnumerableProperties(this, {
            "type": {
                value: Microsoft.Office.WebExtension.EventType.DialogEventReceived
            },
            "error": {
                value: message[OSF.DDA.PropertyDescriptors.MessageType]
            }
        });
    }
};
OSF.DDA.DialogParentEventArgs = function OSF_DDA_DialogParentEventArgs(message) {
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.DialogParentMessageReceived
        },
        "message": {
            value: message[OSF.DDA.PropertyDescriptors.MessageContent]
        }
    });
};
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.DisplayDialogAsync,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.Url,
            "types": ["string"]
        }
    ],
    supportedOptions: [
        {
            name: Microsoft.Office.WebExtension.Parameters.Width,
            value: {
                "types": ["number"],
                "defaultValue": 99
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.Height,
            value: {
                "types": ["number"],
                "defaultValue": 99
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.RequireHTTPs,
            value: {
                "types": ["boolean"],
                "defaultValue": true
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.DisplayInIframe,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.HideTitle,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.UseDeviceIndependentPixels,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.PromptBeforeOpen,
            value: {
                "types": ["boolean"],
                "defaultValue": true
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.EnforceAppDomain,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        }
    ],
    privateStateCallbacks: [],
    onSucceeded: function (args, caller, callArgs) {
        var targetId = args[Microsoft.Office.WebExtension.Parameters.Id];
        var eventDispatch = args[Microsoft.Office.WebExtension.Parameters.Data];
        var dialog = new OSF.DialogHandler();
        var closeDialog = OSF.DDA.AsyncMethodNames.CloseAsync.displayName;
        OSF.OUtil.defineEnumerableProperty(dialog, closeDialog, {
            value: function () {
                var closeDialogfunction = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.CloseDialog];
                closeDialogfunction(arguments, targetId, eventDispatch, dialog);
            }
        });
        var addHandler = OSF.DDA.SyncMethodNames.AddMessageHandler.displayName;
        OSF.OUtil.defineEnumerableProperty(dialog, addHandler, {
            value: function () {
                var syncMethodCall = OSF.DDA.SyncMethodCalls[OSF.DDA.SyncMethodNames.AddMessageHandler.id];
                var callArgs = syncMethodCall.verifyAndExtractCall(arguments, dialog, eventDispatch);
                var eventType = callArgs[Microsoft.Office.WebExtension.Parameters.EventType];
                var handler = callArgs[Microsoft.Office.WebExtension.Parameters.Handler];
                return eventDispatch.addEventHandlerAndFireQueuedEvent(eventType, handler);
            }
        });
        var sendMessage = OSF.DDA.SyncMethodNames.SendMessage.displayName;
        OSF.OUtil.defineEnumerableProperty(dialog, sendMessage, {
            value: function () {
                var execute = OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.SendMessage];
                return execute(arguments, eventDispatch, dialog);
            }
        });
        return dialog;
    },
    checkCallArgs: function (callArgs, caller, stateInfo) {
        if (callArgs[Microsoft.Office.WebExtension.Parameters.Width] <= 0) {
            callArgs[Microsoft.Office.WebExtension.Parameters.Width] = 1;
        }
        if (!callArgs[Microsoft.Office.WebExtension.Parameters.UseDeviceIndependentPixels] && callArgs[Microsoft.Office.WebExtension.Parameters.Width] > 100) {
            callArgs[Microsoft.Office.WebExtension.Parameters.Width] = 99;
        }
        if (callArgs[Microsoft.Office.WebExtension.Parameters.Height] <= 0) {
            callArgs[Microsoft.Office.WebExtension.Parameters.Height] = 1;
        }
        if (!callArgs[Microsoft.Office.WebExtension.Parameters.UseDeviceIndependentPixels] && callArgs[Microsoft.Office.WebExtension.Parameters.Height] > 100) {
            callArgs[Microsoft.Office.WebExtension.Parameters.Height] = 99;
        }
        if (!callArgs[Microsoft.Office.WebExtension.Parameters.RequireHTTPs]) {
            callArgs[Microsoft.Office.WebExtension.Parameters.RequireHTTPs] = true;
        }
        return callArgs;
    }
});
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.CloseAsync,
    requiredArguments: [],
    supportedOptions: [],
    privateStateCallbacks: []
});
OSF.DDA.SyncMethodCalls.define({
    method: OSF.DDA.SyncMethodNames.MessageParent,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.MessageToParent,
            "types": ["string", "number", "boolean"]
        }
    ],
    supportedOptions: []
});
OSF.DDA.SyncMethodCalls.define({
    method: OSF.DDA.SyncMethodNames.AddMessageHandler,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.EventType,
            "enum": Microsoft.Office.WebExtension.EventType,
            "verify": function (eventType, caller, eventDispatch) { return eventDispatch.supportsEvent(eventType); }
        },
        {
            "name": Microsoft.Office.WebExtension.Parameters.Handler,
            "types": ["function"]
        }
    ],
    supportedOptions: []
});
OSF.DDA.SyncMethodCalls.define({
    method: OSF.DDA.SyncMethodNames.SendMessage,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.MessageContent,
            "types": ["string"]
        }
    ],
    supportedOptions: [],
    privateStateCallbacks: []
});
OSF.DDA.SafeArray.Delegate.openDialog = function OSF_DDA_SafeArray_Delegate$OpenDialog(args) {
    try {
        if (args.onCalling) {
            args.onCalling();
        }
        var callback = OSF.DDA.SafeArray.Delegate._getOnAfterRegisterEvent(true, args);
        OSF.ClientHostController.openDialog(args.dispId, args.targetId, function OSF_DDA_SafeArrayDelegate$RegisterEventAsync_OnEvent(eventDispId, payload) {
            if (args.onEvent) {
                args.onEvent(payload);
            }
            if (OSF.AppTelemetry) {
                OSF.AppTelemetry.onEventDone(args.dispId);
            }
        }, callback);
    }
    catch (ex) {
        OSF.DDA.SafeArray.Delegate._onException(ex, args);
    }
};
OSF.DDA.SafeArray.Delegate.closeDialog = function OSF_DDA_SafeArray_Delegate$CloseDialog(args) {
    if (args.onCalling) {
        args.onCalling();
    }
    var callback = OSF.DDA.SafeArray.Delegate._getOnAfterRegisterEvent(false, args);
    try {
        OSF.ClientHostController.closeDialog(args.dispId, args.targetId, callback);
    }
    catch (ex) {
        OSF.DDA.SafeArray.Delegate._onException(ex, args);
    }
};
OSF.DDA.SafeArray.Delegate.messageParent = function OSF_DDA_SafeArray_Delegate$MessageParent(args) {
    try {
        if (args.onCalling) {
            args.onCalling();
        }
        var startTime = (new Date()).getTime();
        var result = OSF.ClientHostController.messageParent(args.hostCallArgs);
        if (args.onReceiving) {
            args.onReceiving();
        }
        if (OSF.AppTelemetry) {
            OSF.AppTelemetry.onMethodDone(args.dispId, args.hostCallArgs, Math.abs((new Date()).getTime() - startTime), result);
        }
        return result;
    }
    catch (ex) {
        return OSF.DDA.SafeArray.Delegate._onExceptionSyncMethod(ex);
    }
};
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidDialogMessageReceivedEvent,
    fromHost: [
        { name: OSF.DDA.EventDescriptors.DialogMessageReceivedEvent, value: OSF.DDA.SafeArray.Delegate.ParameterMap.self }
    ],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDescriptors.DialogMessageReceivedEvent,
    fromHost: [
        { name: OSF.DDA.PropertyDescriptors.MessageType, value: 0 },
        { name: OSF.DDA.PropertyDescriptors.MessageContent, value: 1 }
    ],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.sendMessage = function OSF_DDA_SafeArray_Delegate$SendMessage(args) {
    try {
        if (args.onCalling) {
            args.onCalling();
        }
        var startTime = (new Date()).getTime();
        var result = OSF.ClientHostController.sendMessage(args.hostCallArgs);
        if (args.onReceiving) {
            args.onReceiving();
        }
        return result;
    }
    catch (ex) {
        return OSF.DDA.SafeArray.Delegate._onExceptionSyncMethod(ex);
    }
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { ItemChanged: "olkItemSelectedChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkItemSelectedData: "OlkItemSelectedData" });
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { RecipientsChanged: "olkRecipientsChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkRecipientsData: "OlkRecipientsData" });
OSF.DDA.OlkRecipientsChangedEventArgs = function OSF_DDA_OlkRecipientsChangedEventArgs(eventData) {
    var changedRecipientFields = eventData[OSF.DDA.EventDescriptors.OlkRecipientsData][0];
    if (changedRecipientFields === "") {
        changedRecipientFields = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.RecipientsChanged
        },
        "changedRecipientFields": {
            value: JSON.parse(changedRecipientFields)
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { AppointmentTimeChanged: "olkAppointmentTimeChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkAppointmentTimeChangedData: "OlkAppointmentTimeChangedData" });
OSF.DDA.OlkAppointmentTimeChangedEventArgs = function OSF_DDA_OlkAppointmentTimeChangedEventArgs(eventData) {
    var appointmentTimeString = eventData[OSF.DDA.EventDescriptors.OlkAppointmentTimeChangedData][0];
    var start;
    var end;
    try {
        var appointmentTime = JSON.parse(appointmentTimeString);
        start = new Date(appointmentTime.start).toISOString();
        end = new Date(appointmentTime.end).toISOString();
    }
    catch (e) {
        start = null;
        end = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.AppointmentTimeChanged
        },
        "start": {
            value: start
        },
        "end": {
            value: end
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { RecurrenceChanged: "olkRecurrenceChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkRecurrenceData: "OlkRecurrenceData" });
OSF.DDA.OlkRecurrenceChangedEventArgs = function OSF_DDA_OlkRecurrenceChangedEventArgs(eventData) {
    var recurrenceObject = null;
    try {
        var dataObject = JSON.parse(eventData[OSF.DDA.EventDescriptors.OlkRecurrenceChangedData][0]);
        if (dataObject.recurrence != null) {
            recurrenceObject = JSON.parse(dataObject.recurrence);
            recurrenceObject = Microsoft.Office.WebExtension.OutlookBase.SeriesTimeJsonConverter(recurrenceObject);
        }
    }
    catch (e) {
        recurrenceObject = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.RecurrenceChanged
        },
        "recurrence": {
            value: recurrenceObject
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { OfficeThemeChanged: "officeThemeChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OfficeThemeData: "OfficeThemeData" });
OSF.OUtil.setNamespace("Theming", OSF.DDA);
OSF.DDA.Theming.OfficeThemeChangedEventArgs = function OSF_DDA_Theming_OfficeThemeChangedEventArgs(officeTheme) {
    var themeData = JSON.parse(officeTheme.OfficeThemeData[0]);
    var themeDataHex = {};
    for (var color in themeData) {
        themeDataHex[color] = OSF.OUtil.convertIntToCssHexColor(themeData[color]);
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.OfficeThemeChanged
        },
        "officeTheme": {
            value: themeDataHex
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { AttachmentsChanged: "olkAttachmentsChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkAttachmentsChangedData: "OlkAttachmentsChangedData" });
OSF.DDA.OlkAttachmentsChangedEventArgs = function OSF_DDA_OlkAttachmentsChangedEventArgs(eventData) {
    var attachmentStatus;
    var attachmentDetails;
    try {
        var attachmentChangedObject = JSON.parse(eventData[OSF.DDA.EventDescriptors.OlkAttachmentsChangedData][0]);
        attachmentStatus = attachmentChangedObject.attachmentStatus;
        attachmentDetails = Microsoft.Office.WebExtension.OutlookBase.CreateAttachmentDetails(attachmentChangedObject.attachmentDetails);
    }
    catch (e) {
        attachmentStatus = null;
        attachmentDetails = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.AttachmentsChanged
        },
        "attachmentStatus": {
            value: attachmentStatus
        },
        "attachmentDetails": {
            value: attachmentDetails
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { EnhancedLocationsChanged: "olkEnhancedLocationsChanged" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkEnhancedLocationsChangedData: "OlkEnhancedLocationsChangedData" });
OSF.DDA.OlkEnhancedLocationsChangedEventArgs = function OSF_DDA_OlkEnhancedLocationsChangedEventArgs(eventData) {
    var enhancedLocations;
    try {
        var enhancedLocationsChangedObject = JSON.parse(eventData[OSF.DDA.EventDescriptors.OlkEnhancedLocationsChangedData][0]);
        enhancedLocations = enhancedLocationsChangedObject.enhancedLocations;
    }
    catch (e) {
        enhancedLocations = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.EnhancedLocationsChanged
        },
        "enhancedLocations": {
            value: enhancedLocations
        }
    });
};
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { InfobarClicked: "olkInfobarClicked" });
OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, { OlkInfobarClickedData: "OlkInfobarClickedData" });
OSF.DDA.OlkInfobarClickedEventArgs = function OSF_DDA_OlkInfobarClickedEventArgs(eventData) {
    var infobarDetails;
    try {
        infobarDetails = eventData[OSF.DDA.EventDescriptors.OlkInfobarClickedData][0];
    }
    catch (e) {
        infobarDetails = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.InfobarClicked
        },
        "infobarDetails": {
            value: infobarDetails
        }
    });
};
OSF.DDA.OlkItemSelectedChangedEventArgs = function OSF_DDA_OlkItemSelectedChangedEventArgs(eventData) {
    var initialDataSource = eventData[OSF.DDA.EventDescriptors.OlkItemSelectedData][0];
    if (initialDataSource === "") {
        initialDataSource = null;
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": {
            value: Microsoft.Office.WebExtension.EventType.ItemChanged
        },
        "initialData": {
            value: JSON.parse(initialDataSource)
        },
        "itemNumber": {
            value: JSON.parse(eventData[OSF.DDA.EventDescriptors.OlkItemSelectedData][1])
        }
    });
};
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkItemSelectedChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkItemSelectedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkRecipientsChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkRecipientsData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkAppointmentTimeChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkAppointmentTimeChangedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkRecurrenceChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkRecurrenceChangedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOfficeThemeChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OfficeThemeData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkAttachmentsChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkAttachmentsChangedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkEnhancedLocationsChangedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkEnhancedLocationsChangedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidOlkInfobarClickedEvent,
    fromHost: [{
            name: OSF.DDA.EventDescriptors.OlkInfobarClickedData,
            value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData
        }],
    isComplexType: true
});
var OSFLog;
(function (OSFLog) {
    var BaseUsageData = (function () {
        function BaseUsageData(table) {
            this._table = table;
            this._fields = {};
        }
        Object.defineProperty(BaseUsageData.prototype, "Fields", {
            get: function () {
                return this._fields;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseUsageData.prototype, "Table", {
            get: function () {
                return this._table;
            },
            enumerable: true,
            configurable: true
        });
        BaseUsageData.prototype.SerializeFields = function () {
        };
        BaseUsageData.prototype.SetSerializedField = function (key, value) {
            if (typeof (value) !== "undefined" && value !== null) {
                this._serializedFields[key] = value.toString();
            }
        };
        BaseUsageData.prototype.SerializeRow = function () {
            this._serializedFields = {};
            this.SetSerializedField("Table", this._table);
            this.SerializeFields();
            return JSON.stringify(this._serializedFields);
        };
        return BaseUsageData;
    })();
    OSFLog.BaseUsageData = BaseUsageData;
    var AppActivatedUsageData = (function (_super) {
        __extends(AppActivatedUsageData, _super);
        function AppActivatedUsageData() {
            _super.call(this, "AppActivated");
        }
        Object.defineProperty(AppActivatedUsageData.prototype, "CorrelationId", {
            get: function () { return this.Fields["CorrelationId"]; },
            set: function (value) { this.Fields["CorrelationId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "SessionId", {
            get: function () { return this.Fields["SessionId"]; },
            set: function (value) { this.Fields["SessionId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AppId", {
            get: function () { return this.Fields["AppId"]; },
            set: function (value) { this.Fields["AppId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AppInstanceId", {
            get: function () { return this.Fields["AppInstanceId"]; },
            set: function (value) { this.Fields["AppInstanceId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AppURL", {
            get: function () { return this.Fields["AppURL"]; },
            set: function (value) { this.Fields["AppURL"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AssetId", {
            get: function () { return this.Fields["AssetId"]; },
            set: function (value) { this.Fields["AssetId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "Browser", {
            get: function () { return this.Fields["Browser"]; },
            set: function (value) { this.Fields["Browser"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "UserId", {
            get: function () { return this.Fields["UserId"]; },
            set: function (value) { this.Fields["UserId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "Host", {
            get: function () { return this.Fields["Host"]; },
            set: function (value) { this.Fields["Host"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "HostVersion", {
            get: function () { return this.Fields["HostVersion"]; },
            set: function (value) { this.Fields["HostVersion"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "ClientId", {
            get: function () { return this.Fields["ClientId"]; },
            set: function (value) { this.Fields["ClientId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AppSizeWidth", {
            get: function () { return this.Fields["AppSizeWidth"]; },
            set: function (value) { this.Fields["AppSizeWidth"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "AppSizeHeight", {
            get: function () { return this.Fields["AppSizeHeight"]; },
            set: function (value) { this.Fields["AppSizeHeight"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "Message", {
            get: function () { return this.Fields["Message"]; },
            set: function (value) { this.Fields["Message"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "DocUrl", {
            get: function () { return this.Fields["DocUrl"]; },
            set: function (value) { this.Fields["DocUrl"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "OfficeJSVersion", {
            get: function () { return this.Fields["OfficeJSVersion"]; },
            set: function (value) { this.Fields["OfficeJSVersion"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "HostJSVersion", {
            get: function () { return this.Fields["HostJSVersion"]; },
            set: function (value) { this.Fields["HostJSVersion"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "WacHostEnvironment", {
            get: function () { return this.Fields["WacHostEnvironment"]; },
            set: function (value) { this.Fields["WacHostEnvironment"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppActivatedUsageData.prototype, "IsFromWacAutomation", {
            get: function () { return this.Fields["IsFromWacAutomation"]; },
            set: function (value) { this.Fields["IsFromWacAutomation"] = value; },
            enumerable: true,
            configurable: true
        });
        AppActivatedUsageData.prototype.SerializeFields = function () {
            this.SetSerializedField("CorrelationId", this.CorrelationId);
            this.SetSerializedField("SessionId", this.SessionId);
            this.SetSerializedField("AppId", this.AppId);
            this.SetSerializedField("AppInstanceId", this.AppInstanceId);
            this.SetSerializedField("AppURL", this.AppURL);
            this.SetSerializedField("AssetId", this.AssetId);
            this.SetSerializedField("Browser", this.Browser);
            this.SetSerializedField("UserId", this.UserId);
            this.SetSerializedField("Host", this.Host);
            this.SetSerializedField("HostVersion", this.HostVersion);
            this.SetSerializedField("ClientId", this.ClientId);
            this.SetSerializedField("AppSizeWidth", this.AppSizeWidth);
            this.SetSerializedField("AppSizeHeight", this.AppSizeHeight);
            this.SetSerializedField("Message", this.Message);
            this.SetSerializedField("DocUrl", this.DocUrl);
            this.SetSerializedField("OfficeJSVersion", this.OfficeJSVersion);
            this.SetSerializedField("HostJSVersion", this.HostJSVersion);
            this.SetSerializedField("WacHostEnvironment", this.WacHostEnvironment);
            this.SetSerializedField("IsFromWacAutomation", this.IsFromWacAutomation);
        };
        return AppActivatedUsageData;
    })(BaseUsageData);
    OSFLog.AppActivatedUsageData = AppActivatedUsageData;
    var ScriptLoadUsageData = (function (_super) {
        __extends(ScriptLoadUsageData, _super);
        function ScriptLoadUsageData() {
            _super.call(this, "ScriptLoad");
        }
        Object.defineProperty(ScriptLoadUsageData.prototype, "CorrelationId", {
            get: function () { return this.Fields["CorrelationId"]; },
            set: function (value) { this.Fields["CorrelationId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScriptLoadUsageData.prototype, "SessionId", {
            get: function () { return this.Fields["SessionId"]; },
            set: function (value) { this.Fields["SessionId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScriptLoadUsageData.prototype, "ScriptId", {
            get: function () { return this.Fields["ScriptId"]; },
            set: function (value) { this.Fields["ScriptId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScriptLoadUsageData.prototype, "StartTime", {
            get: function () { return this.Fields["StartTime"]; },
            set: function (value) { this.Fields["StartTime"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScriptLoadUsageData.prototype, "ResponseTime", {
            get: function () { return this.Fields["ResponseTime"]; },
            set: function (value) { this.Fields["ResponseTime"] = value; },
            enumerable: true,
            configurable: true
        });
        ScriptLoadUsageData.prototype.SerializeFields = function () {
            this.SetSerializedField("CorrelationId", this.CorrelationId);
            this.SetSerializedField("SessionId", this.SessionId);
            this.SetSerializedField("ScriptId", this.ScriptId);
            this.SetSerializedField("StartTime", this.StartTime);
            this.SetSerializedField("ResponseTime", this.ResponseTime);
        };
        return ScriptLoadUsageData;
    })(BaseUsageData);
    OSFLog.ScriptLoadUsageData = ScriptLoadUsageData;
    var AppClosedUsageData = (function (_super) {
        __extends(AppClosedUsageData, _super);
        function AppClosedUsageData() {
            _super.call(this, "AppClosed");
        }
        Object.defineProperty(AppClosedUsageData.prototype, "CorrelationId", {
            get: function () { return this.Fields["CorrelationId"]; },
            set: function (value) { this.Fields["CorrelationId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "SessionId", {
            get: function () { return this.Fields["SessionId"]; },
            set: function (value) { this.Fields["SessionId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "FocusTime", {
            get: function () { return this.Fields["FocusTime"]; },
            set: function (value) { this.Fields["FocusTime"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "AppSizeFinalWidth", {
            get: function () { return this.Fields["AppSizeFinalWidth"]; },
            set: function (value) { this.Fields["AppSizeFinalWidth"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "AppSizeFinalHeight", {
            get: function () { return this.Fields["AppSizeFinalHeight"]; },
            set: function (value) { this.Fields["AppSizeFinalHeight"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "OpenTime", {
            get: function () { return this.Fields["OpenTime"]; },
            set: function (value) { this.Fields["OpenTime"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppClosedUsageData.prototype, "CloseMethod", {
            get: function () { return this.Fields["CloseMethod"]; },
            set: function (value) { this.Fields["CloseMethod"] = value; },
            enumerable: true,
            configurable: true
        });
        AppClosedUsageData.prototype.SerializeFields = function () {
            this.SetSerializedField("CorrelationId", this.CorrelationId);
            this.SetSerializedField("SessionId", this.SessionId);
            this.SetSerializedField("FocusTime", this.FocusTime);
            this.SetSerializedField("AppSizeFinalWidth", this.AppSizeFinalWidth);
            this.SetSerializedField("AppSizeFinalHeight", this.AppSizeFinalHeight);
            this.SetSerializedField("OpenTime", this.OpenTime);
            this.SetSerializedField("CloseMethod", this.CloseMethod);
        };
        return AppClosedUsageData;
    })(BaseUsageData);
    OSFLog.AppClosedUsageData = AppClosedUsageData;
    var APIUsageUsageData = (function (_super) {
        __extends(APIUsageUsageData, _super);
        function APIUsageUsageData() {
            _super.call(this, "APIUsage");
        }
        Object.defineProperty(APIUsageUsageData.prototype, "CorrelationId", {
            get: function () { return this.Fields["CorrelationId"]; },
            set: function (value) { this.Fields["CorrelationId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "SessionId", {
            get: function () { return this.Fields["SessionId"]; },
            set: function (value) { this.Fields["SessionId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "APIType", {
            get: function () { return this.Fields["APIType"]; },
            set: function (value) { this.Fields["APIType"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "APIID", {
            get: function () { return this.Fields["APIID"]; },
            set: function (value) { this.Fields["APIID"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "Parameters", {
            get: function () { return this.Fields["Parameters"]; },
            set: function (value) { this.Fields["Parameters"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "ResponseTime", {
            get: function () { return this.Fields["ResponseTime"]; },
            set: function (value) { this.Fields["ResponseTime"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIUsageUsageData.prototype, "ErrorType", {
            get: function () { return this.Fields["ErrorType"]; },
            set: function (value) { this.Fields["ErrorType"] = value; },
            enumerable: true,
            configurable: true
        });
        APIUsageUsageData.prototype.SerializeFields = function () {
            this.SetSerializedField("CorrelationId", this.CorrelationId);
            this.SetSerializedField("SessionId", this.SessionId);
            this.SetSerializedField("APIType", this.APIType);
            this.SetSerializedField("APIID", this.APIID);
            this.SetSerializedField("Parameters", this.Parameters);
            this.SetSerializedField("ResponseTime", this.ResponseTime);
            this.SetSerializedField("ErrorType", this.ErrorType);
        };
        return APIUsageUsageData;
    })(BaseUsageData);
    OSFLog.APIUsageUsageData = APIUsageUsageData;
    var AppInitializationUsageData = (function (_super) {
        __extends(AppInitializationUsageData, _super);
        function AppInitializationUsageData() {
            _super.call(this, "AppInitialization");
        }
        Object.defineProperty(AppInitializationUsageData.prototype, "CorrelationId", {
            get: function () { return this.Fields["CorrelationId"]; },
            set: function (value) { this.Fields["CorrelationId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppInitializationUsageData.prototype, "SessionId", {
            get: function () { return this.Fields["SessionId"]; },
            set: function (value) { this.Fields["SessionId"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppInitializationUsageData.prototype, "SuccessCode", {
            get: function () { return this.Fields["SuccessCode"]; },
            set: function (value) { this.Fields["SuccessCode"] = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppInitializationUsageData.prototype, "Message", {
            get: function () { return this.Fields["Message"]; },
            set: function (value) { this.Fields["Message"] = value; },
            enumerable: true,
            configurable: true
        });
        AppInitializationUsageData.prototype.SerializeFields = function () {
            this.SetSerializedField("CorrelationId", this.CorrelationId);
            this.SetSerializedField("SessionId", this.SessionId);
            this.SetSerializedField("SuccessCode", this.SuccessCode);
            this.SetSerializedField("Message", this.Message);
        };
        return AppInitializationUsageData;
    })(BaseUsageData);
    OSFLog.AppInitializationUsageData = AppInitializationUsageData;
})(OSFLog || (OSFLog = {}));
var Logger;
(function (Logger) {
    "use strict";
    (function (TraceLevel) {
        TraceLevel[TraceLevel["info"] = 0] = "info";
        TraceLevel[TraceLevel["warning"] = 1] = "warning";
        TraceLevel[TraceLevel["error"] = 2] = "error";
    })(Logger.TraceLevel || (Logger.TraceLevel = {}));
    var TraceLevel = Logger.TraceLevel;
    (function (SendFlag) {
        SendFlag[SendFlag["none"] = 0] = "none";
        SendFlag[SendFlag["flush"] = 1] = "flush";
    })(Logger.SendFlag || (Logger.SendFlag = {}));
    var SendFlag = Logger.SendFlag;
    function allowUploadingData() {
    }
    Logger.allowUploadingData = allowUploadingData;
    function sendLog(traceLevel, message, flag) {
    }
    Logger.sendLog = sendLog;
    function creatULSEndpoint() {
        try {
            return new ULSEndpointProxy();
        }
        catch (e) {
            return null;
        }
    }
    var ULSEndpointProxy = (function () {
        function ULSEndpointProxy() {
        }
        ULSEndpointProxy.prototype.writeLog = function (log) {
        };
        ULSEndpointProxy.prototype.loadProxyFrame = function () {
        };
        return ULSEndpointProxy;
    })();
    if (!OSF.Logger) {
        OSF.Logger = Logger;
    }
    Logger.ulsEndpoint = creatULSEndpoint();
})(Logger || (Logger = {}));
var OSFAriaLogger;
(function (OSFAriaLogger) {
    var TelemetryEventAppActivated = { name: "AppActivated", enabled: true, basic: true, critical: true, points: [
            { name: "Browser", type: "string" },
            { name: "Message", type: "string" },
            { name: "AppURL", type: "string" },
            { name: "Host", type: "string" },
            { name: "AppSizeWidth", type: "int64" },
            { name: "AppSizeHeight", type: "int64" },
            { name: "IsFromWacAutomation", type: "string" },
        ] };
    var TelemetryEventScriptLoad = { name: "ScriptLoad", enabled: true, basic: false, critical: false, points: [
            { name: "ScriptId", type: "string" },
            { name: "StartTime", type: "double" },
            { name: "ResponseTime", type: "double" },
        ] };
    var TelemetryEventApiUsage = { name: "APIUsage", enabled: false, basic: false, critical: false, points: [
            { name: "APIType", type: "string" },
            { name: "APIID", type: "int64" },
            { name: "Parameters", type: "string" },
            { name: "ResponseTime", type: "int64" },
            { name: "ErrorType", type: "int64" },
        ] };
    var TelemetryEventAppInitialization = { name: "AppInitialization", enabled: true, basic: false, critical: false, points: [
            { name: "SuccessCode", type: "int64" },
            { name: "Message", type: "string" },
        ] };
    var TelemetryEventAppClosed = { name: "AppClosed", enabled: true, basic: false, critical: false, points: [
            { name: "FocusTime", type: "int64" },
            { name: "AppSizeFinalWidth", type: "int64" },
            { name: "AppSizeFinalHeight", type: "int64" },
            { name: "OpenTime", type: "int64" },
        ] };
    var TelemetryEvents = [
        TelemetryEventAppActivated,
        TelemetryEventScriptLoad,
        TelemetryEventApiUsage,
        TelemetryEventAppInitialization,
        TelemetryEventAppClosed,
    ];
    function createDataField(value, point) {
        var key = point.rename === undefined ? point.name : point.rename;
        var type = point.type;
        var field = undefined;
        switch (type) {
            case "string":
                field = oteljs.makeStringDataField(key, value);
                break;
            case "double":
                if (typeof value === "string") {
                    value = parseFloat(value);
                }
                field = oteljs.makeDoubleDataField(key, value);
                break;
            case "int64":
                if (typeof value === "string") {
                    value = parseInt(value);
                }
                field = oteljs.makeInt64DataField(key, value);
                break;
            case "boolean":
                if (typeof value === "string") {
                    value = value === "true";
                }
                field = oteljs.makeBooleanDataField(key, value);
                break;
        }
        return field;
    }
    function getEventDefinition(eventName) {
        for (var _i = 0; _i < TelemetryEvents.length; _i++) {
            var event_1 = TelemetryEvents[_i];
            if (event_1.name === eventName) {
                return event_1;
            }
        }
        return undefined;
    }
    function eventEnabled(eventName) {
        var eventDefinition = getEventDefinition(eventName);
        if (eventDefinition === undefined) {
            return false;
        }
        return eventDefinition.enabled;
    }
    function generateTelemetryEvent(eventName, telemetryData) {
        var eventDefinition = getEventDefinition(eventName);
        if (eventDefinition === undefined) {
            return undefined;
        }
        var dataFields = [];
        for (var _i = 0, _a = eventDefinition.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var key = point.name;
            var value = telemetryData[key];
            if (value === undefined) {
                continue;
            }
            var field = createDataField(value, point);
            if (field !== undefined) {
                dataFields.push(field);
            }
        }
        var flags = { dataCategories: oteljs.DataCategories.ProductServiceUsage };
        if (eventDefinition.critical) {
            flags.samplingPolicy = oteljs.SamplingPolicy.CriticalBusinessImpact;
        }
        if (eventDefinition.basic) {
            flags.diagnosticLevel = oteljs.DiagnosticLevel.BasicEvent;
        }
        var eventNameFull = "Office.Extensibility.OfficeJs." + eventName + "X";
        var event = { eventName: eventNameFull, dataFields: dataFields, eventFlags: flags };
        return event;
    }
    function sendOtelTelemetryEvent(eventName, telemetryData) {
        if (eventEnabled(eventName)) {
            if (typeof OTel !== "undefined") {
                OTel.OTelLogger.onTelemetryLoaded(function () {
                    var event = generateTelemetryEvent(eventName, telemetryData);
                    if (event === undefined) {
                        return;
                    }
                    Microsoft.Office.WebExtension.sendTelemetryEvent(event);
                });
            }
        }
    }
    var AriaLogger = (function () {
        function AriaLogger() {
        }
        AriaLogger.prototype.getAriaCDNLocation = function () {
            return (OSF._OfficeAppFactory.getLoadScriptHelper().getOfficeJsBasePath() + "ariatelemetry/aria-web-telemetry.js");
        };
        AriaLogger.getInstance = function () {
            if (AriaLogger.AriaLoggerObj === undefined) {
                AriaLogger.AriaLoggerObj = new AriaLogger();
            }
            return AriaLogger.AriaLoggerObj;
        };
        AriaLogger.prototype.isIUsageData = function (arg) {
            return arg["Fields"] !== undefined;
        };
        AriaLogger.prototype.shouldSendDirectToAria = function () {
            var flavor;
            var version;
            if (OSF._OfficeAppFactory && OSF._OfficeAppFactory.getHostInfo) {
                flavor = OSF._OfficeAppFactory.getHostInfo()["hostPlatform"];
            }
            if (!flavor) {
                return false;
            }
            else if (flavor.toLowerCase() !== "win32") {
                return true;
            }
            if (window.external && typeof window.external.GetContext !== "undefined" && typeof window.external.GetContext().GetHostFullVersion !== "undefined") {
                version = window.external.GetContext().GetHostFullVersion();
            }
            var BASE10 = 10;
            var MAX_MAJOR_VERSION = 16;
            var MAX_MINOR_VERSION = 0;
            var MAX_BUILD_VERSION = 11601;
            if (version) {
                var versionTokens = version.split('.');
                if (versionTokens.length < 3) {
                    return false;
                }
                else if (parseInt(versionTokens[0], BASE10) >= MAX_MAJOR_VERSION &&
                    parseInt(versionTokens[1], BASE10) >= MAX_MINOR_VERSION &&
                    parseInt(versionTokens[2], BASE10) >= MAX_BUILD_VERSION) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        };
        AriaLogger.prototype.isDirectToAriaEnabled = function () {
            if (this.EnableDirectToAria === undefined || this.EnableDirectToAria === null) {
                this.EnableDirectToAria = this.shouldSendDirectToAria();
            }
            return this.EnableDirectToAria;
        };
        AriaLogger.prototype.sendTelemetry = function (tableName, telemetryData) {
            var startAfterMs = 1000;
            var sendAriaEnabled = AriaLogger.EnableSendingTelemetryWithLegacyAria && this.isDirectToAriaEnabled();
            if (sendAriaEnabled) {
                OSF.OUtil.loadScript(this.getAriaCDNLocation(), function () {
                    try {
                        if (!this.ALogger) {
                            var OfficeExtensibilityTenantID = "db334b301e7b474db5e0f02f07c51a47-a1b5bc36-1bbe-482f-a64a-c2d9cb606706-7439";
                            this.ALogger = AWTLogManager.initialize(OfficeExtensibilityTenantID);
                        }
                        var eventProperties = new AWTEventProperties();
                        eventProperties.setName("Office.Extensibility.OfficeJS." + tableName);
                        for (var key in telemetryData) {
                            if (key.toLowerCase() !== "table") {
                                eventProperties.setProperty(key, telemetryData[key]);
                            }
                        }
                        var today = new Date();
                        eventProperties.setProperty("Date", today.toISOString());
                        this.ALogger.logEvent(eventProperties);
                    }
                    catch (e) {
                    }
                }, startAfterMs);
            }
            if (AriaLogger.EnableSendingTelemetryWithOTel) {
                sendOtelTelemetryEvent(tableName, telemetryData);
            }
        };
        AriaLogger.prototype.logData = function (data) {
            if (this.isIUsageData(data)) {
                this.sendTelemetry(data["Table"], data["Fields"]);
            }
            else {
                this.sendTelemetry(data["Table"], data);
            }
        };
        AriaLogger.EnableSendingTelemetryWithOTel = true;
        AriaLogger.EnableSendingTelemetryWithLegacyAria = false;
        return AriaLogger;
    })();
    OSFAriaLogger.AriaLogger = AriaLogger;
})(OSFAriaLogger || (OSFAriaLogger = {}));
var OSFAppTelemetry;
(function (OSFAppTelemetry) {
    "use strict";
    var appInfo;
    var sessionId = OSF.OUtil.Guid.generateNewGuid();
    var osfControlAppCorrelationId = "";
    var omexDomainRegex = new RegExp("^https?://store\\.office(ppe|-int)?\\.com/", "i");
    OSFAppTelemetry.enableTelemetry = true;
    ;
    var AppInfo = (function () {
        function AppInfo() {
        }
        return AppInfo;
    })();
    OSFAppTelemetry.AppInfo = AppInfo;
    var Event = (function () {
        function Event(name, handler) {
            this.name = name;
            this.handler = handler;
        }
        return Event;
    })();
    var AppStorage = (function () {
        function AppStorage() {
            this.clientIDKey = "Office API client";
            this.logIdSetKey = "Office App Log Id Set";
        }
        AppStorage.prototype.getClientId = function () {
            var clientId = this.getValue(this.clientIDKey);
            if (!clientId || clientId.length <= 0 || clientId.length > 40) {
                clientId = OSF.OUtil.Guid.generateNewGuid();
                this.setValue(this.clientIDKey, clientId);
            }
            return clientId;
        };
        AppStorage.prototype.saveLog = function (logId, log) {
            var logIdSet = this.getValue(this.logIdSetKey);
            logIdSet = ((logIdSet && logIdSet.length > 0) ? (logIdSet + ";") : "") + logId;
            this.setValue(this.logIdSetKey, logIdSet);
            this.setValue(logId, log);
        };
        AppStorage.prototype.enumerateLog = function (callback, clean) {
            var logIdSet = this.getValue(this.logIdSetKey);
            if (logIdSet) {
                var ids = logIdSet.split(";");
                for (var id in ids) {
                    var logId = ids[id];
                    var log = this.getValue(logId);
                    if (log) {
                        if (callback) {
                            callback(logId, log);
                        }
                        if (clean) {
                            this.remove(logId);
                        }
                    }
                }
                if (clean) {
                    this.remove(this.logIdSetKey);
                }
            }
        };
        AppStorage.prototype.getValue = function (key) {
            var osfLocalStorage = OSF.OUtil.getLocalStorage();
            var value = "";
            if (osfLocalStorage) {
                value = osfLocalStorage.getItem(key);
            }
            return value;
        };
        AppStorage.prototype.setValue = function (key, value) {
            var osfLocalStorage = OSF.OUtil.getLocalStorage();
            if (osfLocalStorage) {
                osfLocalStorage.setItem(key, value);
            }
        };
        AppStorage.prototype.remove = function (key) {
            var osfLocalStorage = OSF.OUtil.getLocalStorage();
            if (osfLocalStorage) {
                try {
                    osfLocalStorage.removeItem(key);
                }
                catch (ex) {
                }
            }
        };
        return AppStorage;
    })();
    var AppLogger = (function () {
        function AppLogger() {
        }
        AppLogger.prototype.LogData = function (data) {
            if (!OSFAppTelemetry.enableTelemetry) {
                return;
            }
            try {
                OSFAriaLogger.AriaLogger.getInstance().logData(data);
            }
            catch (e) {
            }
        };
        AppLogger.prototype.LogRawData = function (log) {
            if (!OSFAppTelemetry.enableTelemetry) {
                return;
            }
            try {
                OSFAriaLogger.AriaLogger.getInstance().logData(JSON.parse(log));
            }
            catch (e) {
            }
        };
        return AppLogger;
    })();
    function trimStringToLowerCase(input) {
        if (input) {
            input = input.replace(/[{}]/g, "").toLowerCase();
        }
        return (input || "");
    }
    var UrlFilter = (function () {
        function UrlFilter() {
        }
        UrlFilter.hashString = function (s) {
            var hash = 0;
            if (s.length === 0) {
                return hash;
            }
            for (var i = 0; i < s.length; i++) {
                var c = s.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash |= 0;
            }
            return hash;
        };
        ;
        UrlFilter.stringToHash = function (s) {
            var hash = UrlFilter.hashString(s);
            var stringHash = hash.toString();
            if (hash < 0) {
                stringHash = "1" + stringHash.substring(1);
            }
            else {
                stringHash = "0" + stringHash;
            }
            return stringHash;
        };
        UrlFilter.startsWith = function (s, prefix) {
            return s.indexOf(prefix) == -0;
        };
        UrlFilter.isFileUrl = function (url) {
            return UrlFilter.startsWith(url.toLowerCase(), "file:");
        };
        UrlFilter.removeHttpPrefix = function (url) {
            var prefix = "";
            if (UrlFilter.startsWith(url.toLowerCase(), UrlFilter.httpsPrefix)) {
                prefix = UrlFilter.httpsPrefix;
            }
            else if (UrlFilter.startsWith(url.toLowerCase(), UrlFilter.httpPrefix)) {
                prefix = UrlFilter.httpPrefix;
            }
            var clean = url.slice(prefix.length);
            return clean;
        };
        UrlFilter.getUrlDomain = function (url) {
            var domain = UrlFilter.removeHttpPrefix(url);
            domain = domain.split("/")[0];
            domain = domain.split(":")[0];
            return domain;
        };
        UrlFilter.isIp4Address = function (domain) {
            var ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return ipv4Regex.test(domain);
        };
        UrlFilter.filter = function (url) {
            if (UrlFilter.isFileUrl(url)) {
                var hash = UrlFilter.stringToHash(url);
                return "file://" + hash;
            }
            var domain = UrlFilter.getUrlDomain(url);
            if (UrlFilter.isIp4Address(domain)) {
                var hash = UrlFilter.stringToHash(url);
                if (UrlFilter.startsWith(domain, "10.")) {
                    return "IP10Range_" + hash;
                }
                else if (UrlFilter.startsWith(domain, "192.")) {
                    return "IP192Range_" + hash;
                }
                else if (UrlFilter.startsWith(domain, "127.")) {
                    return "IP127Range_" + hash;
                }
                return "IPOther_" + hash;
            }
            return domain;
        };
        UrlFilter.httpPrefix = "http://";
        UrlFilter.httpsPrefix = "https://";
        return UrlFilter;
    })();
    function initialize(context) {
        if (!OSFAppTelemetry.enableTelemetry) {
            return;
        }
        if (appInfo) {
            return;
        }
        appInfo = new AppInfo();
        if (context.get_hostFullVersion()) {
            appInfo.hostVersion = context.get_hostFullVersion();
        }
        else {
            appInfo.hostVersion = context.get_appVersion();
        }
        appInfo.appId = context.get_id();
        appInfo.host = context.get_appName();
        appInfo.browser = window.navigator.userAgent;
        appInfo.correlationId = trimStringToLowerCase(context.get_correlationId());
        appInfo.clientId = (new AppStorage()).getClientId();
        appInfo.appInstanceId = context.get_appInstanceId();
        if (appInfo.appInstanceId) {
            appInfo.appInstanceId = appInfo.appInstanceId.replace(/[{}]/g, "").toLowerCase();
        }
        appInfo.message = context.get_hostCustomMessage();
        appInfo.officeJSVersion = OSF.ConstantNames.FileVersion;
        appInfo.hostJSVersion = "16.0.11804.10000";
        if (context._wacHostEnvironment) {
            appInfo.wacHostEnvironment = context._wacHostEnvironment;
        }
        if (context._isFromWacAutomation !== undefined && context._isFromWacAutomation !== null) {
            appInfo.isFromWacAutomation = context._isFromWacAutomation.toString().toLowerCase();
        }
        var docUrl = context.get_docUrl();
        appInfo.docUrl = omexDomainRegex.test(docUrl) ? docUrl : "";
        var url = location.href;
        if (url) {
            url = url.split("?")[0].split("#")[0];
        }
        appInfo.appURL = UrlFilter.filter(url);
        (function getUserIdAndAssetIdFromToken(token, appInfo) {
            var xmlContent;
            var parser;
            var xmlDoc;
            appInfo.assetId = "";
            appInfo.userId = "";
            try {
                xmlContent = decodeURIComponent(token);
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlContent, "text/xml");
                var cidNode = xmlDoc.getElementsByTagName("t")[0].attributes.getNamedItem("cid");
                var oidNode = xmlDoc.getElementsByTagName("t")[0].attributes.getNamedItem("oid");
                if (cidNode && cidNode.nodeValue) {
                    appInfo.userId = cidNode.nodeValue;
                }
                else if (oidNode && oidNode.nodeValue) {
                    appInfo.userId = oidNode.nodeValue;
                }
                appInfo.assetId = xmlDoc.getElementsByTagName("t")[0].attributes.getNamedItem("aid").nodeValue;
            }
            catch (e) {
            }
            finally {
                xmlContent = null;
                xmlDoc = null;
                parser = null;
            }
        })(context.get_eToken(), appInfo);
        appInfo.sessionId = sessionId;
        appInfo.name = context.get_addinName();
        if (typeof OTel !== "undefined") {
            OTel.OTelLogger.initialize(appInfo);
        }
        (function handleLifecycle() {
            var startTime = new Date();
            var lastFocus = null;
            var focusTime = 0;
            var finished = false;
            var adjustFocusTime = function () {
                if (document.hasFocus()) {
                    if (lastFocus == null) {
                        lastFocus = new Date();
                    }
                }
                else if (lastFocus) {
                    focusTime += Math.abs((new Date()).getTime() - lastFocus.getTime());
                    lastFocus = null;
                }
            };
            var eventList = [];
            eventList.push(new Event("focus", adjustFocusTime));
            eventList.push(new Event("blur", adjustFocusTime));
            eventList.push(new Event("focusout", adjustFocusTime));
            eventList.push(new Event("focusin", adjustFocusTime));
            var exitFunction = function () {
                for (var i = 0; i < eventList.length; i++) {
                    OSF.OUtil.removeEventListener(window, eventList[i].name, eventList[i].handler);
                }
                eventList.length = 0;
                if (!finished) {
                    if (document.hasFocus() && lastFocus) {
                        focusTime += Math.abs((new Date()).getTime() - lastFocus.getTime());
                        lastFocus = null;
                    }
                    OSFAppTelemetry.onAppClosed(Math.abs((new Date()).getTime() - startTime.getTime()), focusTime);
                    finished = true;
                }
            };
            eventList.push(new Event("beforeunload", exitFunction));
            eventList.push(new Event("unload", exitFunction));
            for (var i = 0; i < eventList.length; i++) {
                OSF.OUtil.addEventListener(window, eventList[i].name, eventList[i].handler);
            }
            adjustFocusTime();
        })();
        OSFAppTelemetry.onAppActivated();
    }
    OSFAppTelemetry.initialize = initialize;
    function onAppActivated() {
        if (!appInfo) {
            return;
        }
        (new AppStorage()).enumerateLog(function (id, log) { return (new AppLogger()).LogRawData(log); }, true);
        var data = new OSFLog.AppActivatedUsageData();
        data.SessionId = sessionId;
        data.AppId = appInfo.appId;
        data.AssetId = appInfo.assetId;
        data.AppURL = appInfo.appURL;
        data.UserId = "";
        data.ClientId = appInfo.clientId;
        data.Browser = appInfo.browser;
        data.Host = appInfo.host;
        data.HostVersion = appInfo.hostVersion;
        data.CorrelationId = trimStringToLowerCase(appInfo.correlationId);
        data.AppSizeWidth = window.innerWidth;
        data.AppSizeHeight = window.innerHeight;
        data.AppInstanceId = appInfo.appInstanceId;
        data.Message = appInfo.message;
        data.DocUrl = appInfo.docUrl;
        data.OfficeJSVersion = appInfo.officeJSVersion;
        data.HostJSVersion = appInfo.hostJSVersion;
        if (appInfo.wacHostEnvironment) {
            data.WacHostEnvironment = appInfo.wacHostEnvironment;
        }
        if (appInfo.isFromWacAutomation !== undefined && appInfo.isFromWacAutomation !== null) {
            data.IsFromWacAutomation = appInfo.isFromWacAutomation;
        }
        (new AppLogger()).LogData(data);
    }
    OSFAppTelemetry.onAppActivated = onAppActivated;
    function onScriptDone(scriptId, msStartTime, msResponseTime, appCorrelationId) {
        var data = new OSFLog.ScriptLoadUsageData();
        data.CorrelationId = trimStringToLowerCase(appCorrelationId);
        data.SessionId = sessionId;
        data.ScriptId = scriptId;
        data.StartTime = msStartTime;
        data.ResponseTime = msResponseTime;
        (new AppLogger()).LogData(data);
    }
    OSFAppTelemetry.onScriptDone = onScriptDone;
    function onCallDone(apiType, id, parameters, msResponseTime, errorType) {
        if (!appInfo) {
            return;
        }
        var data = new OSFLog.APIUsageUsageData();
        data.CorrelationId = trimStringToLowerCase(osfControlAppCorrelationId);
        data.SessionId = sessionId;
        data.APIType = apiType;
        data.APIID = id;
        data.Parameters = parameters;
        data.ResponseTime = msResponseTime;
        data.ErrorType = errorType;
        (new AppLogger()).LogData(data);
    }
    OSFAppTelemetry.onCallDone = onCallDone;
    ;
    function onMethodDone(id, args, msResponseTime, errorType) {
        var parameters = null;
        if (args) {
            if (typeof args == "number") {
                parameters = String(args);
            }
            else if (typeof args === "object") {
                for (var index in args) {
                    if (parameters !== null) {
                        parameters += ",";
                    }
                    else {
                        parameters = "";
                    }
                    if (typeof args[index] == "number") {
                        parameters += String(args[index]);
                    }
                }
            }
            else {
                parameters = "";
            }
        }
        OSF.AppTelemetry.onCallDone("method", id, parameters, msResponseTime, errorType);
    }
    OSFAppTelemetry.onMethodDone = onMethodDone;
    function onPropertyDone(propertyName, msResponseTime) {
        OSF.AppTelemetry.onCallDone("property", -1, propertyName, msResponseTime);
    }
    OSFAppTelemetry.onPropertyDone = onPropertyDone;
    function onEventDone(id, errorType) {
        OSF.AppTelemetry.onCallDone("event", id, null, 0, errorType);
    }
    OSFAppTelemetry.onEventDone = onEventDone;
    function onRegisterDone(register, id, msResponseTime, errorType) {
        OSF.AppTelemetry.onCallDone(register ? "registerevent" : "unregisterevent", id, null, msResponseTime, errorType);
    }
    OSFAppTelemetry.onRegisterDone = onRegisterDone;
    function onAppClosed(openTime, focusTime) {
        if (!appInfo) {
            return;
        }
        var data = new OSFLog.AppClosedUsageData();
        data.CorrelationId = trimStringToLowerCase(osfControlAppCorrelationId);
        data.SessionId = sessionId;
        data.FocusTime = focusTime;
        data.OpenTime = openTime;
        data.AppSizeFinalWidth = window.innerWidth;
        data.AppSizeFinalHeight = window.innerHeight;
        (new AppStorage()).saveLog(sessionId, data.SerializeRow());
    }
    OSFAppTelemetry.onAppClosed = onAppClosed;
    function setOsfControlAppCorrelationId(correlationId) {
        osfControlAppCorrelationId = trimStringToLowerCase(correlationId);
    }
    OSFAppTelemetry.setOsfControlAppCorrelationId = setOsfControlAppCorrelationId;
    function doAppInitializationLogging(isException, message) {
        var data = new OSFLog.AppInitializationUsageData();
        data.CorrelationId = trimStringToLowerCase(osfControlAppCorrelationId);
        data.SessionId = sessionId;
        data.SuccessCode = isException ? 1 : 0;
        data.Message = message;
        (new AppLogger()).LogData(data);
    }
    OSFAppTelemetry.doAppInitializationLogging = doAppInitializationLogging;
    function logAppCommonMessage(message) {
        doAppInitializationLogging(false, message);
    }
    OSFAppTelemetry.logAppCommonMessage = logAppCommonMessage;
    function logAppException(errorMessage) {
        doAppInitializationLogging(true, errorMessage);
    }
    OSFAppTelemetry.logAppException = logAppException;
    OSF.AppTelemetry = OSFAppTelemetry;
})(OSFAppTelemetry || (OSFAppTelemetry = {}));
var OfficeExt;
(function (OfficeExt) {
    var AppCommand;
    (function (AppCommand) {
        var AppCommandManager = (function () {
            function AppCommandManager() {
                var _this = this;
                this._pseudoDocument = null;
                this._eventDispatch = null;
                this._processAppCommandInvocation = function (args) {
                    var verifyResult = _this._verifyManifestCallback(args.callbackName);
                    if (verifyResult.errorCode != OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
                        _this._invokeAppCommandCompletedMethod(args.appCommandId, verifyResult.errorCode, "");
                        return;
                    }
                    var eventObj = _this._constructEventObjectForCallback(args);
                    if (eventObj) {
                        window.setTimeout(function () { verifyResult.callback(eventObj); }, 0);
                    }
                    else {
                        _this._invokeAppCommandCompletedMethod(args.appCommandId, OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError, "");
                    }
                };
            }
            AppCommandManager.initializeOsfDda = function () {
                OSF.DDA.AsyncMethodNames.addNames({
                    AppCommandInvocationCompletedAsync: "appCommandInvocationCompletedAsync"
                });
                OSF.DDA.AsyncMethodCalls.define({
                    method: OSF.DDA.AsyncMethodNames.AppCommandInvocationCompletedAsync,
                    requiredArguments: [{
                            "name": Microsoft.Office.WebExtension.Parameters.Id,
                            "types": ["string"]
                        },
                        {
                            "name": Microsoft.Office.WebExtension.Parameters.Status,
                            "types": ["number"]
                        },
                        {
                            "name": Microsoft.Office.WebExtension.Parameters.AppCommandInvocationCompletedData,
                            "types": ["string"]
                        }
                    ]
                });
                OSF.OUtil.augmentList(OSF.DDA.EventDescriptors, {
                    AppCommandInvokedEvent: "AppCommandInvokedEvent"
                });
                OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, {
                    AppCommandInvoked: "appCommandInvoked"
                });
                OSF.OUtil.setNamespace("AppCommand", OSF.DDA);
                OSF.DDA.AppCommand.AppCommandInvokedEventArgs = OfficeExt.AppCommand.AppCommandInvokedEventArgs;
            };
            AppCommandManager.prototype.initializeAndChangeOnce = function (callback) {
                AppCommand.registerDdaFacade();
                this._pseudoDocument = {};
                OSF.DDA.DispIdHost.addAsyncMethods(this._pseudoDocument, [
                    OSF.DDA.AsyncMethodNames.AppCommandInvocationCompletedAsync,
                ]);
                this._eventDispatch = new OSF.EventDispatch([
                    Microsoft.Office.WebExtension.EventType.AppCommandInvoked,
                ]);
                var onRegisterCompleted = function (result) {
                    if (callback) {
                        if (result.status == "succeeded") {
                            callback(OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess);
                        }
                        else {
                            callback(OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError);
                        }
                    }
                };
                OSF.DDA.DispIdHost.addEventSupport(this._pseudoDocument, this._eventDispatch);
                this._pseudoDocument.addHandlerAsync(Microsoft.Office.WebExtension.EventType.AppCommandInvoked, this._processAppCommandInvocation, onRegisterCompleted);
            };
            AppCommandManager.prototype._verifyManifestCallback = function (callbackName) {
                var defaultResult = { callback: null, errorCode: OSF.DDA.ErrorCodeManager.errorCodes.ooeInvalidCallback };
                callbackName = callbackName.trim();
                try {
                    var callList = callbackName.split(".");
                    var parentObject = window;
                    for (var i = 0; i < callList.length - 1; i++) {
                        if (parentObject[callList[i]] && (typeof parentObject[callList[i]] == "object" || typeof parentObject[callList[i]] == "function")) {
                            parentObject = parentObject[callList[i]];
                        }
                        else {
                            return defaultResult;
                        }
                    }
                    var callbackFunc = parentObject[callList[callList.length - 1]];
                    if (typeof callbackFunc != "function") {
                        return defaultResult;
                    }
                }
                catch (e) {
                    return defaultResult;
                }
                return { callback: callbackFunc, errorCode: OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess };
            };
            AppCommandManager.prototype._invokeAppCommandCompletedMethod = function (appCommandId, resultCode, data) {
                this._pseudoDocument.appCommandInvocationCompletedAsync(appCommandId, resultCode, data);
            };
            AppCommandManager.prototype._constructEventObjectForCallback = function (args) {
                var _this = this;
                var eventObj = new AppCommandCallbackEventArgs();
                try {
                    var jsonData = JSON.parse(args.eventObjStr);
                    this._translateEventObjectInternal(jsonData, eventObj);
                    Object.defineProperty(eventObj, 'completed', {
                        value: function (completedContext) {
                            eventObj.completedContext = completedContext;
                            var jsonString = JSON.stringify(eventObj);
                            _this._invokeAppCommandCompletedMethod(args.appCommandId, OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess, jsonString);
                        },
                        enumerable: true
                    });
                }
                catch (e) {
                    eventObj = null;
                }
                return eventObj;
            };
            AppCommandManager.prototype._translateEventObjectInternal = function (input, output) {
                for (var key in input) {
                    if (!input.hasOwnProperty(key))
                        continue;
                    var inputChild = input[key];
                    if (typeof inputChild == "object" && inputChild != null) {
                        OSF.OUtil.defineEnumerableProperty(output, key, {
                            value: {}
                        });
                        this._translateEventObjectInternal(inputChild, output[key]);
                    }
                    else {
                        Object.defineProperty(output, key, {
                            value: inputChild,
                            enumerable: true,
                            writable: true
                        });
                    }
                }
            };
            AppCommandManager.prototype._constructObjectByTemplate = function (template, input) {
                var output = {};
                if (!template || !input)
                    return output;
                for (var key in template) {
                    if (template.hasOwnProperty(key)) {
                        output[key] = null;
                        if (input[key] != null) {
                            var templateChild = template[key];
                            var inputChild = input[key];
                            var inputChildType = typeof inputChild;
                            if (typeof templateChild == "object" && templateChild != null) {
                                output[key] = this._constructObjectByTemplate(templateChild, inputChild);
                            }
                            else if (inputChildType == "number" || inputChildType == "string" || inputChildType == "boolean") {
                                output[key] = inputChild;
                            }
                        }
                    }
                }
                return output;
            };
            AppCommandManager.instance = function () {
                if (AppCommandManager._instance == null) {
                    AppCommandManager._instance = new AppCommandManager();
                }
                return AppCommandManager._instance;
            };
            AppCommandManager._instance = null;
            return AppCommandManager;
        })();
        AppCommand.AppCommandManager = AppCommandManager;
        var AppCommandInvokedEventArgs = (function () {
            function AppCommandInvokedEventArgs(appCommandId, callbackName, eventObjStr) {
                this.type = Microsoft.Office.WebExtension.EventType.AppCommandInvoked;
                this.appCommandId = appCommandId;
                this.callbackName = callbackName;
                this.eventObjStr = eventObjStr;
            }
            AppCommandInvokedEventArgs.create = function (eventProperties) {
                return new AppCommandInvokedEventArgs(eventProperties[AppCommand.AppCommandInvokedEventEnums.AppCommandId], eventProperties[AppCommand.AppCommandInvokedEventEnums.CallbackName], eventProperties[AppCommand.AppCommandInvokedEventEnums.EventObjStr]);
            };
            return AppCommandInvokedEventArgs;
        })();
        AppCommand.AppCommandInvokedEventArgs = AppCommandInvokedEventArgs;
        var AppCommandCallbackEventArgs = (function () {
            function AppCommandCallbackEventArgs() {
            }
            return AppCommandCallbackEventArgs;
        })();
        AppCommand.AppCommandCallbackEventArgs = AppCommandCallbackEventArgs;
        AppCommand.AppCommandInvokedEventEnums = {
            AppCommandId: "appCommandId",
            CallbackName: "callbackName",
            EventObjStr: "eventObjStr"
        };
    })(AppCommand = OfficeExt.AppCommand || (OfficeExt.AppCommand = {}));
})(OfficeExt || (OfficeExt = {}));
OfficeExt.AppCommand.AppCommandManager.initializeOsfDda();
var OfficeExt;
(function (OfficeExt) {
    var AppCommand;
    (function (AppCommand) {
        function registerDdaFacade() {
            if (OSF.DDA.SafeArray) {
                var parameterMap = OSF.DDA.SafeArray.Delegate.ParameterMap;
                parameterMap.define({
                    type: OSF.DDA.MethodDispId.dispidAppCommandInvocationCompletedMethod,
                    toHost: [
                        { name: Microsoft.Office.WebExtension.Parameters.Id, value: 0 },
                        { name: Microsoft.Office.WebExtension.Parameters.Status, value: 1 },
                        { name: Microsoft.Office.WebExtension.Parameters.AppCommandInvocationCompletedData, value: 2 }
                    ]
                });
                parameterMap.define({
                    type: OSF.DDA.EventDispId.dispidAppCommandInvokedEvent,
                    fromHost: [
                        { name: OSF.DDA.EventDescriptors.AppCommandInvokedEvent, value: parameterMap.self }
                    ],
                    isComplexType: true
                });
                parameterMap.define({
                    type: OSF.DDA.EventDescriptors.AppCommandInvokedEvent,
                    fromHost: [
                        { name: OfficeExt.AppCommand.AppCommandInvokedEventEnums.AppCommandId, value: 0 },
                        { name: OfficeExt.AppCommand.AppCommandInvokedEventEnums.CallbackName, value: 1 },
                        { name: OfficeExt.AppCommand.AppCommandInvokedEventEnums.EventObjStr, value: 2 },
                    ],
                    isComplexType: true
                });
            }
        }
        AppCommand.registerDdaFacade = registerDdaFacade;
    })(AppCommand = OfficeExt.AppCommand || (OfficeExt.AppCommand = {}));
})(OfficeExt || (OfficeExt = {}));
OSF.DDA.AsyncMethodNames.addNames({
    CloseContainerAsync: "closeContainer"
});
var OfficeExt;
(function (OfficeExt) {
    var Container = (function () {
        function Container(parameters) {
        }
        return Container;
    })();
    OfficeExt.Container = Container;
})(OfficeExt || (OfficeExt = {}));
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.CloseContainerAsync,
    requiredArguments: [],
    supportedOptions: [],
    privateStateCallbacks: []
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidCloseContainerMethod,
    fromHost: [],
    toHost: []
});
OSF.DDA.AsyncMethodNames.addNames({ GetAccessTokenAsync: "getAccessTokenAsync" });
OSF.DDA.Auth = function OSF_DDA_Auth() {
};
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.GetAccessTokenAsync,
    requiredArguments: [],
    supportedOptions: [
        {
            name: Microsoft.Office.WebExtension.Parameters.ForceConsent,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.ForceAddAccount,
            value: {
                "types": ["boolean"],
                "defaultValue": false
            }
        },
        {
            name: Microsoft.Office.WebExtension.Parameters.AuthChallenge,
            value: {
                "types": ["string"],
                "defaultValue": ""
            }
        }
    ],
    onSucceeded: function (dataDescriptor, caller, callArgs) {
        var data = dataDescriptor[Microsoft.Office.WebExtension.Parameters.Data];
        return data;
    }
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidGetAccessTokenMethod,
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.ForceConsent, value: 0 },
        { name: Microsoft.Office.WebExtension.Parameters.ForceAddAccount, value: 1 },
        { name: Microsoft.Office.WebExtension.Parameters.AuthChallenge, value: 2 }
    ],
    fromHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Data, value: OSF.DDA.SafeArray.Delegate.ParameterMap.self }
    ]
});
OSF.DDA.AsyncMethodNames.addNames({
    OpenBrowserWindow: "openBrowserWindow"
});
OSF.DDA.OpenBrowser = function OSF_DDA_OpenBrowser() {
};
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.OpenBrowserWindow,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.Url,
            "types": ["string"]
        }
    ],
    supportedOptions: [
        {
            name: Microsoft.Office.WebExtension.Parameters.Reserved,
            value: {
                "types": ["number"],
                "defaultValue": 0
            }
        }
    ],
    privateStateCallbacks: []
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidOpenBrowserWindow,
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Reserved, value: 0 },
        { name: Microsoft.Office.WebExtension.Parameters.Url, value: 1 }
    ]
});
OSF.DDA.AsyncMethodNames.addNames({
    ExecuteFeature: "executeFeatureAsync",
    QueryFeature: "queryFeatureAsync"
});
OSF.OUtil.augmentList(OSF.DDA.PropertyDescriptors, {
    FeatureProperties: "FeatureProperties",
    TcidEnabled: "TcidEnabled",
    TcidVisible: "TcidVisible"
});
OSF.DDA.ExecuteFeature = function OSF_DDA_ExecuteFeature() {
};
OSF.DDA.QueryFeature = function OSF_DDA_QueryFeature() {
};
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.ExecuteFeature,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.Tcid,
            "types": ["number"]
        }
    ],
    privateStateCallbacks: []
});
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.QueryFeature,
    requiredArguments: [
        {
            "name": Microsoft.Office.WebExtension.Parameters.Tcid,
            "types": ["number"]
        }
    ],
    privateStateCallbacks: []
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.PropertyDescriptors.FeatureProperties,
    fromHost: [
        { name: OSF.DDA.PropertyDescriptors.TcidEnabled, value: 0 },
        { name: OSF.DDA.PropertyDescriptors.TcidVisible, value: 1 }
    ],
    isComplexType: true
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidExecuteFeature,
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Tcid, value: 0 }
    ]
});
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidQueryFeature,
    fromHost: [
        { name: OSF.DDA.PropertyDescriptors.FeatureProperties, value: OSF.DDA.SafeArray.Delegate.ParameterMap.self }
    ],
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Tcid, value: 0 }
    ]
});
OSF.DDA.AsyncMethodNames.addNames({
    ExecuteRichApiRequestAsync: "executeRichApiRequestAsync"
});
OSF.DDA.AsyncMethodCalls.define({
    method: OSF.DDA.AsyncMethodNames.ExecuteRichApiRequestAsync,
    requiredArguments: [
        {
            name: Microsoft.Office.WebExtension.Parameters.Data,
            types: ["object"]
        }
    ],
    supportedOptions: []
});
OSF.OUtil.setNamespace("RichApi", OSF.DDA);
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.MethodDispId.dispidExecuteRichApiRequestMethod,
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Data, value: 0 }
    ],
    fromHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Data, value: OSF.DDA.SafeArray.Delegate.ParameterMap.self }
    ]
});
OSF.OUtil.augmentList(Microsoft.Office.WebExtension.EventType, { RichApiMessage: "richApiMessage" });
OSF.DDA.RichApiMessageEventArgs = function OSF_DDA_RichApiMessageEventArgs(eventType, eventProperties) {
    var entryArray = eventProperties[Microsoft.Office.WebExtension.Parameters.Data];
    var entries = [];
    if (entryArray) {
        for (var i = 0; i < entryArray.length; i++) {
            var elem = entryArray[i];
            if (elem.toArray) {
                elem = elem.toArray();
            }
            entries.push({
                messageCategory: elem[0],
                messageType: elem[1],
                targetId: elem[2],
                message: elem[3],
                id: elem[4],
                isRemoteOverride: elem[5]
            });
        }
    }
    OSF.OUtil.defineEnumerableProperties(this, {
        "type": { value: Microsoft.Office.WebExtension.EventType.RichApiMessage },
        "entries": { value: entries }
    });
};
var OfficeExt;
(function (OfficeExt) {
    var RichApiMessageManager = (function () {
        function RichApiMessageManager() {
            this._eventDispatch = null;
            this._eventDispatch = new OSF.EventDispatch([
                Microsoft.Office.WebExtension.EventType.RichApiMessage,
            ]);
            OSF.DDA.DispIdHost.addEventSupport(this, this._eventDispatch);
        }
        return RichApiMessageManager;
    })();
    OfficeExt.RichApiMessageManager = RichApiMessageManager;
})(OfficeExt || (OfficeExt = {}));
OSF.DDA.SafeArray.Delegate.ParameterMap.define({
    type: OSF.DDA.EventDispId.dispidRichApiMessageEvent,
    toHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Data, value: 0 }
    ],
    fromHost: [
        { name: Microsoft.Office.WebExtension.Parameters.Data, value: OSF.DDA.SafeArray.Delegate.ParameterMap.sourceData }
    ]
});
var OfficeJsClient_OutlookWin32;
(function (OfficeJsClient_OutlookWin32) {
    function prepareApiSurface(appContext) {
        if (appContext.get_isDialog()) {
            appContext.ui = new OSF.DDA.UI.ChildUI();
        }
        else {
            appContext.ui = new OSF.DDA.UI.ParentUI();
            OSF.DDA.DispIdHost.addAsyncMethods(appContext.ui, [OSF.DDA.AsyncMethodNames.CloseContainerAsync]);
        }
        appContext.auth = new OSF.DDA.Auth();
        OSF.DDA.DispIdHost.addAsyncMethods(appContext.auth, [OSF.DDA.AsyncMethodNames.GetAccessTokenAsync]);
    }
    OfficeJsClient_OutlookWin32.prepareApiSurface = prepareApiSurface;
    function prepareRightAfterWebExtensionInitialize() {
        var appCommandHandler = OfficeExt.AppCommand.AppCommandManager.instance();
        appCommandHandler.initializeAndChangeOnce();
    }
    OfficeJsClient_OutlookWin32.prepareRightAfterWebExtensionInitialize = prepareRightAfterWebExtensionInitialize;
})(OfficeJsClient_OutlookWin32 || (OfficeJsClient_OutlookWin32 = {}));
OSF.InitializationHelper.prototype.prepareRightAfterWebExtensionInitialize = function OSF_InitializationHelper$prepareRightAfterWebExtensionInitialize() {
    OfficeJsClient_OutlookWin32.prepareRightAfterWebExtensionInitialize();
};
;OSF.InitializationHelper.prototype.prepareApiSurface = function OSF_InitializationHelper$prepareApiSurface(appContext)
{
    var license = new OSF.DDA.License(appContext.get_eToken());
    if ((appContext.get_appName() == OSF.AppName.OutlookWebApp)) {
        OSF.WebApp._UpdateLinksForHostAndXdmInfo();
        this.initWebDialog(appContext);
        this.initWebAuth(appContext);
        OSF._OfficeAppFactory.setContext(new OSF.DDA.OutlookContext(appContext, this._settings, license, appContext.appOM));
        OSF._OfficeAppFactory.setHostFacade(new OSF.DDA.DispIdHost.Facade(OSF.DDA.WAC.getDelegateMethods,OSF.DDA.WAC.Delegate.ParameterMap));
	}
    else {
        OfficeJsClient_OutlookWin32.prepareApiSurface(appContext); 
        OSF._OfficeAppFactory.setContext(new OSF.DDA.OutlookContext(appContext, this._settings, license, appContext.appOM, OSF.DDA.OfficeTheme ? OSF.DDA.OfficeTheme.getOfficeTheme : null, appContext.ui));
        OSF._OfficeAppFactory.setHostFacade(new OSF.DDA.DispIdHost.Facade(OSF.DDA.DispIdHost.getClientDelegateMethods,OSF.DDA.SafeArray.Delegate.ParameterMap));
    }
}
OSF.DDA.SettingsManager = {
    SerializedSettings: "serializedSettings",
    DateJSONPrefix: "Date(",
    DataJSONSuffix: ")",
    serializeSettings: function OSF_DDA_SettingsManager$serializeSettings(settingsCollection) {
        var ret = {};
        for (var key in settingsCollection) {
            var value = settingsCollection[key];
            try  {
                if (JSON) {
                    value = JSON.stringify(value, function dateReplacer(k, v) {
                        return OSF.OUtil.isDate(this[k]) ? OSF.DDA.SettingsManager.DateJSONPrefix + this[k].getTime() + OSF.DDA.SettingsManager.DataJSONSuffix : v;
                    });
                } else {
                    value = Sys.Serialization.JavaScriptSerializer.serialize(value);
                }
                ret[key] = value;
            } catch (ex) {
            }
        }
        return ret;
    },
    deserializeSettings: function OSF_DDA_SettingsManager$deserializeSettings(serializedSettings) {
        var ret = {};
        serializedSettings = serializedSettings || {};
        for (var key in serializedSettings) {
            var value = serializedSettings[key];
            try  {
                if (JSON) {
                    value = JSON.parse(value, function dateReviver(k, v) {
                        var d;
                        if (typeof v === 'string' && v && v.length > 6 && v.slice(0, 5) === OSF.DDA.SettingsManager.DateJSONPrefix && v.slice(-1) === OSF.DDA.SettingsManager.DataJSONSuffix) {
                            d = new Date(parseInt(v.slice(5, -1)));
                            if (d) {
                                return d;
                            }
                        }
                        return v;
                    });
                } else {
                    value = Sys.Serialization.JavaScriptSerializer.deserialize(value, true);
                }
                ret[key] = value;
            } catch (ex) {
            }
        }
        return ret;
    }
};
OSF.InitializationHelper.prototype.loadAppSpecificScriptAndCreateOM = function OSF_InitializationHelper$loadAppSpecificScriptAndCreateOM(appContext, appReady, basePath) {

var Outlook = typeof Outlook === "object" ? Outlook : {}; Outlook["OutlookAppOm"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return loadLocalizedScript; });
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var OSF = __webpack_require__(1);

global.Promise = __webpack_require__(3);
var OfficeStringJS = "office_strings.js";
var OfficeStringDebugJS = "office_strings.debug.js";
var ExtensibilityStringJS = "outlook_strings.js";
var tempWindow = window;
var ExtensibilityStrings;
function getString(string) {
  return ExtensibilityStrings[string];
}

function loadStrings() {
  return new Promise(function (resolve) {
    var interval = setInterval(function () {
      if (typeof tempWindow._u !== "undefined") {
        ExtensibilityStrings = tempWindow._u.ExtensibilityStrings;
        clearInterval(interval);
        resolve();
      }
    }, 10); // Give up after 1s

    setTimeout(function () {
      clearInterval(interval);
    }, 1000);
  });
}

function loadLocalizedScript(stringLoadedCallback) {
  return __awaiter(this, void 0, void 0, function () {
    var url, baseUrl, officeIndex, scripts, i, tag, filename, fallbackUrl;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = "";
          baseUrl = "";
          scripts = document.getElementsByTagName("script");

          for (i = 0; i < scripts.length; i++) {
            tag = scripts.item(i);

            if (tag && tag.src) {
              filename = tag.src || "";
              filename = filename.toLowerCase();
              officeIndex = filename.indexOf(OfficeStringJS);

              if (filename && officeIndex > 0) {
                url = filename.replace(OfficeStringJS, ExtensibilityStringJS);
                baseUrl = saveBaseUrl(baseUrl, officeIndex, filename);
                break;
              }

              officeIndex = filename.indexOf(OfficeStringDebugJS);

              if (filename && officeIndex > 0) {
                url = filename.replace(OfficeStringDebugJS, ExtensibilityStringJS);
                baseUrl = saveBaseUrl(baseUrl, officeIndex, filename);
                break;
              }
            }
          }

          if (!(url && stringLoadedCallback)) return [3
          /*break*/
          , 2];
          OSF.OUtil.loadScript(url, stringLoadedCallback, 1000);

          if (document.querySelectorAll("script[src=\"" + url + "\"]").length <= 0) {
            fallbackUrl = baseUrl + "en-us/" + ExtensibilityStringJS;
            OSF.OUtil.loadScript(fallbackUrl, stringLoadedCallback, 1000);
          }

          return [4
          /*yield*/
          , loadStrings()];

        case 1:
          _a.sent();

          _a.label = 2;

        case 2:
          return [2
          /*return*/
          ];
      }
    });
  });
}

function saveBaseUrl(baseUrl, officeIndex, filename) {
  // Also save the base url for later use.
  var languageUrl = filename.substring(0, officeIndex);
  var lastIndexOfSlash = languageUrl.lastIndexOf("/", languageUrl.length - 2); // -2 to skip the last slash

  if (lastIndexOfSlash === -1) {
    lastIndexOfSlash = languageUrl.lastIndexOf("\\", languageUrl.length - 2);
  }

  if (lastIndexOfSlash !== -1 && languageUrl.length > lastIndexOfSlash + 1) {
    // includes the slash in the base URL
    baseUrl = languageUrl.substring(0, lastIndexOfSlash + 1);
  }

  return baseUrl;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = OSF;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = Office.Promise;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = Microsoft;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/types/ExtensibilityStrings.ts
var ExtensibilityStrings = __webpack_require__(0);

// CONCATENATED MODULE: ./src/utils/getErrorForTelemetry.ts
var getErrorForTelemetry = function getErrorForTelemetry(resultCode, responseDictionary) {
  // TODO: impl VSO: 3625807
  return resultCode;
};
// CONCATENATED MODULE: ./src/utils/isOwaOnly.ts
var isOwaOnly = function isOwaOnly(dispid) {
  switch (dispid) {
    case 402
    /* recordDataPoint */
    :
    case 401
    /* recordTrace */
    :
    case 400
    /* trackCtq */
    :
    case 403
    /* windowOpenOverrideHandler */
    :
      return true;

    default:
      return false;
  }
};
// CONCATENATED MODULE: ./src/utils/InvokeResultCode.ts
var InvokeResultCode;

(function (InvokeResultCode) {
  InvokeResultCode[InvokeResultCode["noError"] = 0] = "noError";
  InvokeResultCode[InvokeResultCode["errorInRequest"] = -1] = "errorInRequest";
  InvokeResultCode[InvokeResultCode["errorHandlingRequest"] = -2] = "errorHandlingRequest";
  InvokeResultCode[InvokeResultCode["errorInResponse"] = -3] = "errorInResponse";
  InvokeResultCode[InvokeResultCode["errorHandlingResponse"] = -4] = "errorHandlingResponse";
  InvokeResultCode[InvokeResultCode["errorHandlingRequestAccessDenied"] = -5] = "errorHandlingRequestAccessDenied";
  InvokeResultCode[InvokeResultCode["errorHandlingMethodCallTimedout"] = -6] = "errorHandlingMethodCallTimedout";
})(InvokeResultCode || (InvokeResultCode = {}));
// CONCATENATED MODULE: ./src/utils/getErrorArgs.ts


var getErrorArgs_OSF = __webpack_require__(1);

var isInitialized = false;
function getErrorArgs(detailedErrorCode) {
  if (!isInitialized) {
    initialize();
  }

  return getErrorArgs_OSF.DDA.ErrorCodeManager.getErrorArgs(detailedErrorCode);
}
var totalRecipientsLimit = 500;
function initialize() {
  addErrorMessage(9000
  /* AttachmentSizeExceeded */
  , "AttachmentSizeExceeded", Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentExceededSize_Text"));
  addErrorMessage(9001
  /* NumberOfAttachmentsExceeded */
  , "NumberOfAttachmentsExceeded", Object(ExtensibilityStrings["a" /* getString */])("l_ExceededMaxNumberOfAttachments_Text"));
  addErrorMessage(9002
  /* InternalFormatError */
  , "InternalFormatError", Object(ExtensibilityStrings["a" /* getString */])("l_InternalFormatError_Text"));
  addErrorMessage(9003
  /* InvalidAttachmentId */
  , "InvalidAttachmentId", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidAttachmentId_Text"));
  addErrorMessage(9004
  /* InvalidAttachmentPath */
  , "InvalidAttachmentPath", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidAttachmentPath_Text"));
  addErrorMessage(9005
  /* CannotAddAttachmentBeforeUpgrade */
  , "CannotAddAttachmentBeforeUpgrade", Object(ExtensibilityStrings["a" /* getString */])("l_CannotAddAttachmentBeforeUpgrade_Text"));
  addErrorMessage(9006
  /* AttachmentDeletedBeforeUploadCompletes */
  , "AttachmentDeletedBeforeUploadCompletes", Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentDeletedBeforeUploadCompletes_Text"));
  addErrorMessage(9007
  /* AttachmentUploadGeneralFailure */
  , "AttachmentUploadGeneralFailure", Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentUploadGeneralFailure_Text"));
  addErrorMessage(9008
  /* AttachmentToDeleteDoesNotExist */
  , "AttachmentToDeleteDoesNotExist", Object(ExtensibilityStrings["a" /* getString */])("l_DeleteAttachmentDoesNotExist_Text"));
  addErrorMessage(9009
  /* AttachmentDeleteGeneralFailure */
  , "AttachmentDeleteGeneralFailure", Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentDeleteGeneralFailure_Text"));
  addErrorMessage(9010
  /* InvalidEndTime */
  , "InvalidEndTime", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidEndTime_Text"));
  addErrorMessage(9011
  /* HtmlSanitizationFailure */
  , "HtmlSanitizationFailure", Object(ExtensibilityStrings["a" /* getString */])("l_HtmlSanitizationFailure_Text"));
  addErrorMessage(9012
  /* NumberOfRecipientsExceeded */
  , "NumberOfRecipientsExceeded", Object(ExtensibilityStrings["a" /* getString */])("l_NumberOfRecipientsExceeded_Text").replace("{0}", totalRecipientsLimit));
  addErrorMessage(9013
  /* NoValidRecipientsProvided */
  , "NoValidRecipientsProvided", Object(ExtensibilityStrings["a" /* getString */])("l_NoValidRecipientsProvided_Text"));
  addErrorMessage(9014
  /* CursorPositionChanged */
  , "CursorPositionChanged", Object(ExtensibilityStrings["a" /* getString */])("l_CursorPositionChanged_Text"));
  addErrorMessage(9016
  /* InvalidSelection */
  , "InvalidSelection", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidSelection_Text"));
  addErrorMessage(9017
  /* AccessRestricted */
  , "AccessRestricted", "");
  addErrorMessage(9018
  /* GenericTokenError */
  , "GenericTokenError", "");
  addErrorMessage(9019
  /* GenericSettingsError */
  , "GenericSettingsError", "");
  addErrorMessage(9020
  /* GenericResponseError */
  , "GenericResponseError", "");
  addErrorMessage(9021
  /* SaveError */
  , "SaveError", Object(ExtensibilityStrings["a" /* getString */])("l_SaveError_Text"));
  addErrorMessage(9022
  /* MessageInDifferentStoreError */
  , "MessageInDifferentStoreError", Object(ExtensibilityStrings["a" /* getString */])("l_MessageInDifferentStoreError_Text"));
  addErrorMessage(9023
  /* DuplicateNotificationKey */
  , "DuplicateNotificationKey", Object(ExtensibilityStrings["a" /* getString */])("l_DuplicateNotificationKey_Text"));
  addErrorMessage(9024
  /* NotificationKeyNotFound */
  , "NotificationKeyNotFound", Object(ExtensibilityStrings["a" /* getString */])("l_NotificationKeyNotFound_Text"));
  addErrorMessage(9025
  /* NumberOfNotificationsExceeded */
  , "NumberOfNotificationsExceeded", Object(ExtensibilityStrings["a" /* getString */])("l_NumberOfNotificationsExceeded_Text"));
  addErrorMessage(9026
  /* PersistedNotificationArrayReadError */
  , "PersistedNotificationArrayReadError", Object(ExtensibilityStrings["a" /* getString */])("l_PersistedNotificationArrayReadError_Text"));
  addErrorMessage(9027
  /* PersistedNotificationArraySaveError */
  , "PersistedNotificationArraySaveError", Object(ExtensibilityStrings["a" /* getString */])("l_PersistedNotificationArraySaveError_Text"));
  addErrorMessage(9028
  /* CannotPersistPropertyInUnsavedDraftError */
  , "CannotPersistPropertyInUnsavedDraftError", Object(ExtensibilityStrings["a" /* getString */])("l_CannotPersistPropertyInUnsavedDraftError_Text"));
  addErrorMessage(9029
  /* CallSaveAsyncBeforeToken */
  , "CanOnlyGetTokenForSavedItem", Object(ExtensibilityStrings["a" /* getString */])("l_CallSaveAsyncBeforeToken_Text"));
  addErrorMessage(9030
  /* APICallFailedDueToItemChange */
  , "APICallFailedDueToItemChange", Object(ExtensibilityStrings["a" /* getString */])("l_APICallFailedDueToItemChange_Text"));
  addErrorMessage(9031
  /* InvalidParameterValueError */
  , "InvalidParameterValueError", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidParameterValueError_Text"));
  addErrorMessage(9033
  /* SetRecurrenceOnInstance */
  , "SetRecurrenceOnInstanceError", Object(ExtensibilityStrings["a" /* getString */])("l_Recurrence_Error_Instance_SetAsync_Text"));
  addErrorMessage(9034
  /* InvalidRecurrence */
  , "InvalidRecurrenceError", Object(ExtensibilityStrings["a" /* getString */])("l_Recurrence_Error_Properties_Invalid_Text"));
  addErrorMessage(9035
  /* RecurrenceZeroOccurrences */
  , "RecurrenceZeroOccurrences", Object(ExtensibilityStrings["a" /* getString */])("l_RecurrenceErrorZeroOccurrences_Text"));
  addErrorMessage(9036
  /* RecurrenceMaxOccurrences */
  , "RecurrenceMaxOccurrences", Object(ExtensibilityStrings["a" /* getString */])("l_RecurrenceErrorMaxOccurrences_Text"));
  addErrorMessage(9037
  /* RecurrenceInvalidTimeZone */
  , "RecurrenceInvalidTimeZone", Object(ExtensibilityStrings["a" /* getString */])("l_RecurrenceInvalidTimeZone_Text"));
  addErrorMessage(9038
  /* InsufficientItemPermissions */
  , "InsufficientItemPermissionsError", Object(ExtensibilityStrings["a" /* getString */])("l_Insufficient_Item_Permissions_Text"));
  addErrorMessage(9039
  /* RecurrenceUnsupportedAlternateCalendar */
  , "RecurrenceUnsupportedAlternateCalendar", Object(ExtensibilityStrings["a" /* getString */])("l_RecurrenceUnsupportedAlternateCalendar_Text"));
  addErrorMessage(9040
  /* OlkHTTPError */
  , "HTTPRequestFailure", Object(ExtensibilityStrings["a" /* getString */])("l_Olk_Http_Error_Text"));
  addErrorMessage(9041
  /* OlkInternetNotConnectedError */
  , "NetworkError", Object(ExtensibilityStrings["a" /* getString */])("l_Internet_Not_Connected_Error_Text"));
  addErrorMessage(9042
  /* OlkInternalServerError */
  , "InternalServerError", Object(ExtensibilityStrings["a" /* getString */])("l_Internal_Server_Error_Text"));
  addErrorMessage(9043
  /* AttachmentTypeNotSupported */
  , "AttachmentTypeNotSupported", Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentNotSupported_Text"));
  addErrorMessage(9044
  /* OlkInvalidCategoryError */
  , "InvalidCategory", Object(ExtensibilityStrings["a" /* getString */])("l_Invalid_Category_Error_Text"));
  addErrorMessage(9045
  /* DuplicateCategoryError */
  , "DuplicateCategory", Object(ExtensibilityStrings["a" /* getString */])("l_Duplicate_Category_Error_Text"));
  addErrorMessage(9046
  /* ItemNotSavedError */
  , "ItemNotSaved", Object(ExtensibilityStrings["a" /* getString */])("l_Item_Not_Saved_Error_Text"));
  isInitialized = true;
}
function addErrorMessage(code, error, message) {
  getErrorArgs_OSF.DDA.ErrorCodeManager.addErrorMessage(code, {
    name: error,
    message: message
  });
}
// CONCATENATED MODULE: ./src/utils/AdditionalGlobalParameters.ts
var additionalOutlookGlobalParameters;
var getAdditionalGlobalParametersSingleton = function getAdditionalGlobalParametersSingleton() {
  return additionalOutlookGlobalParameters;
};
var recreateAdditionalGlobalParametersSingleton = function recreateAdditionalGlobalParametersSingleton(parameterBlobSupported) {
  additionalOutlookGlobalParameters = new AdditionalGlobalParameters();
  additionalOutlookGlobalParameters.parameterBlobSupported = true;
  return additionalOutlookGlobalParameters;
}; /// <summary>
/// Holds additional parameters for OutlookAppOm calls
/// </summary>

var AdditionalGlobalParameters =
/** @class */
function () {
  /// <summary>
  /// Initializes a new instance of the AdditionalGlobalParameters class.
  /// </summary>
  /// <param name="supported">Flag establishing whether or not this api version supports receiving a blob</param>
  /// Moved supported flag to a get / set
  function AdditionalGlobalParameters() {
    this._parameterBlobSupported = true;
    this._itemNumber = 0;
    additionalOutlookGlobalParameters = this;
  }

  Object.defineProperty(AdditionalGlobalParameters.prototype, "parameterBlobSupported", {
    set: function set(supported) {
      this._parameterBlobSupported = supported;
    },
    enumerable: true,
    configurable: true
  }); /// <summary>
  /// Sets the actions definition.
  /// </summary>
  /// <param name="actionsDefinition">configuration blob to be passed as additional parameter to Outlook Desktop.</param>

  AdditionalGlobalParameters.prototype.setActionsDefinition = function (actionsDefinitionIn
  /* dictionary */
  ) {
    this._actionsDefinition = actionsDefinitionIn;
  }; /// <summary>
  /// Sets the itemNumber additional parameter that is sent from the JS layer to Desktop Outlook.
  /// If itemNumber equals zero, this will be a no-op. We never ever want to send a zero itemNumber to the host app.
  /// In the constructor, it's OK for itemNumber to be zero.
  /// </summary>
  /// <param name="itemNumber">value of the itemNumber additional parameter</param>


  AdditionalGlobalParameters.prototype.setCurrentItemNumber = function (itemNumberIn) {
    if (itemNumberIn > 0) {
      this._itemNumber = itemNumberIn;
    }
  };

  Object.defineProperty(AdditionalGlobalParameters.prototype, "itemNumber", {
    /// <summary>
    /// Get the itemNumber additional parameter that is sent from the JS layer to Desktop Outlook.
    /// </summary>
    /// <returns>value of the itemNumber additional parameter</returns>
    get: function get() {
      return this._itemNumber;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(AdditionalGlobalParameters.prototype, "actionsDefinition", {
    /// <summary>
    /// Get the actions definition blob as additional parameter that is sent from the JS layer to Desktop Outlook.
    /// </summary>
    /// <returns>value of the itemNumber additional parameter</returns>
    get: function get() {
      return this._actionsDefinition;
    },
    enumerable: true,
    configurable: true
  }); /// <summary>
  /// Appends the additional parameters as a json blob to executeParameters.
  /// </summary>
  /// <param name="executeParameters">The array of execute parameters to be appended to.</param>
  /// <param name="additionalApiParameters">The additional parameters to append.</param>

  AdditionalGlobalParameters.prototype.updateOutlookExecuteParameters = function (executeParameters, additionalApiParameters) {
    if (this._parameterBlobSupported) {
      if (this._itemNumber > 0) {
        additionalApiParameters.itemNumber = this._itemNumber.toString();
      }

      if (this._actionsDefinition != null) {
        additionalApiParameters.actions = this.actionsDefinition;
      }

      if (Object.keys(additionalApiParameters).length === 0) {
        // Nothing to add.  We are done.
        return;
      }

      if (executeParameters == null) {
        executeParameters = new Array();
      }

      executeParameters.push(JSON.stringify(additionalApiParameters));
    }
  };

  return AdditionalGlobalParameters;
}();


// CONCATENATED MODULE: ./src/utils/createError.ts
function createError(message, errorInfo) {
  var err = new Error(message);
  err.message = message || "";

  if (errorInfo) {
    for (var v in errorInfo) {
      err[v] = errorInfo[v];
    }
  }

  return err;
} // These are stubs for MsAjax Errors. We should fill this in with the Ajax stubs

function createParameterCountError(message) {
  var displayMessage = "Sys.ParameterCountException: " + (message ? message : "Parameter count mismatch.");
  var err = createError(displayMessage, {
    name: "Sys.ParameterCountException"
  });
  return err;
}
function createArgumentError(paramName, message) {
  var displayMessage = "Sys.ArgumentException: " + (message ? message : "Value does not fall within the expected range.");

  if (paramName) {
    displayMessage += "\n" + "Parameter name: {0}".replace("{0}", paramName);
  }

  var err = createError(displayMessage, {
    name: "Sys.ArgumentException",
    paramName: paramName
  });
  return err;
}
function createNullArgumentError(paramName, message) {
  var displayMessage = "Sys.ArgumentNullException: " + (message ? message : "Value cannot be null.");

  if (paramName) {
    displayMessage += "\n" + "Parameter name: {0}".replace("{0}", paramName);
  }

  var err = createError(displayMessage, {
    name: "Sys.ArgumentNullException",
    paramName: paramName
  });
  return err;
}
function createArgumentOutOfRange(paramName, actualValue, message) {
  var displayMessage = "Sys.ArgumentOutOfRangeException: " + (message ? message : "Specified argument was out of the range of valid values.");

  if (paramName) {
    displayMessage += "\n" + "Parameter name: {0}".replace("{0}", paramName);
  }

  if (typeof actualValue !== "undefined" && actualValue !== null) {
    displayMessage += "\n" + "Actual value was {0}.".replace("{0}", actualValue);
  }

  var err = createError(displayMessage, {
    name: "Sys.ArgumentOutOfRangeException",
    paramName: paramName,
    actualValue: actualValue
  });
  return err;
}
function createArgumentTypeError(paramName, actualType, expectedType, message) {
  var displayMessage = "Sys.ArgumentTypeException: ";

  if (message) {
    displayMessage += message;
  } else if (actualType && expectedType) {
    displayMessage += "Object of type '{0}' cannot be converted to type '{1}'.".replace("{0}", actualType.getName ? actualType.getName() : actualType).replace("{1}", expectedType.getName ? expectedType.getName() : expectedType);
  } else {
    displayMessage += "Object cannot be converted to the required type.";
  }

  if (paramName) {
    displayMessage += "\n" + "Parameter name: {0}".replace("{0}", paramName);
  }

  var err = createError(displayMessage, {
    name: "Sys.ArgumentTypeException",
    paramName: paramName,
    actualType: actualType,
    expectedType: expectedType
  });
  return err;
}
// CONCATENATED MODULE: ./src/utils/callOutlookNativeDispatcher.ts



var callOutlookNativeDispatcher_OSF = __webpack_require__(1);

var callOutlookNativeDispatcher_callOutlookNativeDispatcher = function callOutlookNativeDispatcher(dispid, data, responseCallback) {
  var executeParameters = callOutlookNativeDispatcher_convertToOutlookNativeParameters(dispid, data);
  callOutlookNativeDispatcher_OSF.ClientHostController.execute(dispid, executeParameters, function (nativeData, resultCode) {
    var deserializedData = null; // Here is where XDM and window.external invocations are a little bit bifferent: the
    // callback argument order is different. Data to window.external and the native clients
    // get translated to a native "SafeArray". We've since stopped doing that, and just send the JSON
    // object/dictionary down and let the native hosts parse it. But for our older functions we still need
    // to translate our parameters into a specific order.

    var responseData = nativeData.toArray();

    if (responseData.length > 0) {
      // Retrieve the itemNumber from the Outlook response and check for validity.
      var itemNumberFromOutlookResponse = getItemNumberFromOutlookResponse(responseData);
      var isValidItemNumber = itemNumberFromOutlookResponse > 0;
      var itemChanged = isValidItemNumber && itemNumberFromOutlookResponse > getAdditionalGlobalParametersSingleton().itemNumber; // Deserialize the data received from Outlook.

      deserializedData = createDeserializedData(responseData, itemChanged);
    } else if (responseCallback != null) {
      // It is unexpected to have a non-null responseCallback and empty data from the host simultaneously.
      throw createNullArgumentError("responseData", "Unexpected null/empty data from host.");
    } // Log the API call.
    // In JavaScript, condition below becomes: "OSF.AppTelemetry != null".

    /* TODO: VSO: 3625807
    Fix Instrumentation
    if (OSF.AppTelemetry != null)   // CODE REVIEW: is this change correct?
    {
        let detailedErrorCode : number = OutlookAppOm.GetErrorForTelemetry(resultCode, deserializedData);
           // Log the API call using OSF's telemetry mechanism.
        // This gets translated to OSF.AppTelemetry.onMethodDone(...args...);
        
        
        OSF.AppTelemetry.onMethodDone(
        dispid,
        null,
        Math.abs((new DateTime()).GetTime() - startTime),
        detailedErrorCode);
    }
    */
    // Invoke the responseCallback if it's not null.


    if (responseCallback != null) {
      responseCallback(resultCode, deserializedData);
    }
  });
}; // exported only for unit testing

var callOutlookNativeDispatcher_convertToOutlookNativeParameters = function convertToOutlookNativeParameters(dispid, data) {
  var executeParameters = [];
  var optionalParameters = {};

  switch (dispid) {
    case 12
    /* getCallbackToken */
    :
      // Could this just be optionalParameters = data; ?
      optionalParameters.isRest = data.isRest;
      break;

    case 4
    /* saveCustomProperties */
    :
      {
        var jsonProperty = JSON.stringify(data.customProperties);
        executeParameters = [jsonProperty];
        break;
      }

    case 5
    /* makeEwsRequest */
    :
      executeParameters = new Array(data.body);
      break;

    case 8
    /* displayMessageForm */
    :
    case 9
    /* displayAppointmentForm */
    :
      executeParameters = new Array(data.itemId);
      break;

    case 7
    /* displayNewAppointmentForm */
    :
      executeParameters = new Array(convertRecipientArrayParameterForOutlookForDisplayApi(data.requiredAttendees), convertRecipientArrayParameterForOutlookForDisplayApi(data.optionalAttendees), data.start, data.end, data.location, convertRecipientArrayParameterForOutlookForDisplayApi(data.resources), data.subject, data.body);
      break;

    case 44
    /* displayNewMessageForm */
    :
      executeParameters = [convertRecipientArrayParameterForOutlookForDisplayApi(data.toRecipients), convertRecipientArrayParameterForOutlookForDisplayApi(data.ccRecipients), convertRecipientArrayParameterForOutlookForDisplayApi(data.bccRecipients), data.subject, data.htmlBody, data.attachments];
      break;

    case 43
    /* displayPersonaCard */
    :
      executeParameters = [data.ewsIdOrEmail];
      break;

    case 45
    /* navigateToModule */
    :
      executeParameters = [data.module, // Currently only Addins module is supported and it uses the QueryStringParamName.
      // When new modules are introduced, a way to select different parameters may need to be added here to get extracted and passed to Outlook.
      data.queryString];
      break;

    case 40
    /* registerConsent */
    :
      executeParameters = [data.extensionId, data.consentState];
      break;

    case 11
    /* displayReplyAllForm */
    :
    case 10
    /* displayReplyForm */
    :
      executeParameters = [data.htmlBody];
      break;

    case 31
    /* displayReplyAllFormWithAttachments */
    :
    case 30
    /* displayReplyFormWithAttachments */
    :
      executeParameters = [data.htmlBody, data.attachments];
      break;

    case 23
    /* bodyPrepend */
    :
    case 13
    /* bodySetSelectedData */
    :
    case 38
    /* setBody */
    :
    case 29
    /* setSelectedData */
    :
      executeParameters = [data.data, data.coercionType];
      break;

    case 37
    /* getBody */
    :
    case 28
    /* getSelectedData */
    :
      executeParameters = [data.coercionType];
      break;

    case 17
    /* setSubject */
    :
      executeParameters = [data.subject];
      break;

    case 15
    /* getRecipients */
    :
      executeParameters = [data.recipientField];
      break;

    case 22
    /* addRecipients */
    :
    case 21
    /* setRecipients */
    :
      executeParameters = [data.recipientField, convertComposeEmailDictionaryParameterForSetApi(data.recipientArray)];
      break;

    case 19
    /* addItemAttachment */
    :
      executeParameters = [data.itemId, data.name];
      break;

    case 16
    /* addFileAttachment */
    :
      executeParameters = [data.uri, data.name, data.isInline];
      break;

    case 148
    /* addBase64FileAttachment */
    :
      executeParameters = [data.base64String, data.name, data.isInline];
      break;

    case 20
    /* removeAttachment */
    :
      executeParameters = [data.attachmentIndex];
      break;

    case 25
    /* setTime */
    :
      executeParameters = [data.TimeProperty, data.time];
      break;

    case 24
    /* getTime */
    :
      executeParameters = [data.TimeProperty];
      break;

    case 27
    /* setLocation */
    :
      executeParameters = [data.location];
      break;

    case 33
    /* addNotificationMessage */
    :
    case 35
    /* replaceNotificationMessage */
    :
      executeParameters = [data.key, data.type, data.persistent, data.message, data.icon];
      getAdditionalGlobalParametersSingleton().setActionsDefinition(data.actions);
      break;

    case 36
    /* removeNotificationMessage */
    :
      executeParameters = [data.key];
      break;

    /*
      These are the "default" cases. (either no Parameters, or just copy over all parameters into optionalParameters)
      We used to add each id here, but now it is handled by the default case.
           case OutlookDispId.appendOnSend:
      case OutlookDispId.getAttachmentContent:
      case OutlookDispId.moveToFolder:
      case OutlookDispId.setRecurrence:
      case OutlookDispId.getInternetHeaders:
      case OutlookDispId.setInternetHeaders:
      case OutlookDispId.removeInternetHeaders:
      case OutlookDispId.addEnhancedLocations:
      case OutlookDispId.removeEnhancedLocations:
      case OutlookDispId.addCategories:
      case OutlookDispId.removeCategories:
      case OutlookDispId.addMasterCategories:
      case OutlookDispId.removeMasterCategories:
      case OutlookDispId.logTelemetry:
      case OutlookDispId.setDelayDeliveryTime:
        optionalParameters = data;
        break;
           case OutlookDispId.getInitialData:
      case OutlookDispId.getUserIdentityToken:
      case OutlookDispId.loadCustomProperties:
      case OutlookDispId.getBodyType:
      case OutlookDispId.getSubject:
      case OutlookDispId.getLocation:
      case OutlookDispId.save:
      case OutlookDispId.close:
      case OutlookDispId.getAllNotificationMessages:
      case OutlookDispId.getInitializationContext:
      case OutlookDispId.getRecurrence:
      case OutlookDispId.getFrom:
      case OutlookDispId.getSharedProperties:
      case OutlookDispId.getAttachments:
      case OutlookDispId.getEnhancedLocations:
      case OutlookDispId.getCategories:
      case OutlookDispId.getMasterCategories:
      case OutlookDispId.getItemId:
      case OutlookDispId.getDelayDeliveryTime:
        // No parameters for these functions
        break;
      */

    default:
      // For no parameters, this will set optionalParameters to Undefined
      // For non-special cased parameters, just copy the data over
      optionalParameters = data || {};
      break;
  }

  if (dispid !== 1
  /* getInitialData */
  ) {
      // GetInitialData is excluded because it is needed before AdditionalOutlookParams is only
      // initialized during Initialize, and GetInitialData happens before that.  AdditionalOutlookParams
      // cannot be initialized earlier because we need to initialize it with client info.  Specifically,
      // we cannot add optionalParameters for Outlook 15, unless Outlook 15 and MacOutlook are updated, or
      // we create a specific 15 version for this code.
      getAdditionalGlobalParametersSingleton().updateOutlookExecuteParameters(executeParameters, optionalParameters);
    }

  return executeParameters;
}; /// <summary>
/// Convert string arrays into semicolon (';') separated string for Outlook.
/// This is needed because JS arrays cannot be used as parameters for Outlook.
/// </summary>
/// recipients are either null or the recipient array to convert.
/// returns the converted string.

var convertRecipientArrayParameterForOutlookForDisplayApi = function convertRecipientArrayParameterForOutlookForDisplayApi(recipients) {
  return recipients != null ? recipients.join(";") : "";
}; /// <summary>
/// Convert Email dictionary array into array of string arrays, specifically from:
/// an array of { address: address, name: name } to  an array of [ address, name ]
/// This is needed because JS dictionary cannot be used as parameters for Outlook.
/// </summary>
/// <param name="recipients">recipient dictionaries to convert.</param>
/// <returns>the converted array.</returns>


var convertComposeEmailDictionaryParameterForSetApi = function convertComposeEmailDictionaryParameterForSetApi(recipients) {
  var results = [];

  if (recipients == null) {
    return results;
  }

  for (var i = 0; i < recipients.length; i++) {
    var newRecipient = [recipients[i].address, recipients[i].name];
    results.push(newRecipient);
  }

  return results;
}; /// <summary>
/// Retrieves the "itemNumber" from the response of an async API call to Outlook.
/// All Outlook async calls (since Outlook build 16.0.8101.1000) are now passing back extra parameters as the 3rd parameter
/// in the responseData. The extra parameters include the "itemNumber" and any other relevant information needed to be passed
/// between Outlook and the JS layer. Below are examples of the 2 types of responseData Outlook sends to the JS layer:
///
/// Example where the zeroth entry in the responseData array is a JSON Dictionary:
///      responseData =
///      [
///          { "wasSuccessful" : true, "errorMessage" : null },
///          0,
///          { "itemNumber" : 25 }
///      ]
///
/// Example where the zeroth entry in the responseData array is a number:
/// NOTE : This type of responseData actually comes from Word when Outlook forwards an API call to Word,
/// and then Word sends the response back to the JS layer. For example: getSelectedDataAsync.
///      responseData =
///      [
///          1000,
///          "The specified coercion type is not supported.",
///          { "itemNumber" : 27 }
///      ]
///
/// In the examples above, 25 and 27 are the itemNumbers for the responses.
/// </summary>
/// <param name="responseData">Array of data received from Outlook</param>
/// <remarks>Exposed for unit tests.</remarks>
/// Exported for unit testsing


var getItemNumberFromOutlookResponse = function getItemNumberFromOutlookResponse(responseData) {
  var itemNumber = 0;

  if (responseData.length > 2) {
    var extraParameters = JSON.parse(responseData[2]); // if (extraParameters is Dictionary)

    if (!!extraParameters && typeof extraParameters === "object") {
      itemNumber = extraParameters.itemNumber;
    }
  }

  return itemNumber;
}; /// <summary>
/// Create a deserialized representation of the response of an async API call to Outlook.
/// The response is a serialized array of data.
/// </summary>
/// <param name="responseData">the response of an async API call to Outlook</param>
/// <param name="itemChanged">true => item changed while async request was in progress; false otherwise</param>
/// <returns>a deserialized representation of the data at the zeroth index (index 0) of the response array</returns>
/// <remarks>Exposed for unit tests.</remarks>
/// Exported for Unit Tests

var createDeserializedData = function createDeserializedData(responseData, itemChanged) {
  var deserializedData = null;
  var returnValues = JSON.parse(responseData[0]);

  if (typeof returnValues === "number") {
    deserializedData = createDeserializedDataWithInt(responseData, itemChanged);
  } else if (!!returnValues && typeof returnValues === "object") {
    deserializedData = createDeserializedDataWithDictionary(responseData, itemChanged);
  } else {
    throw new Error("Return data type from host must be Object or Number");
  }

  return deserializedData;
}; /// <summary>
/// Helper method for creating a deserialized representation of the response of an async API call to Outlook,
/// where the zeroth index of the response array is a Dictionary / JSON object.
/// </summary>
/// <param name="responseData">the response of an async API call to Outlook</param>
/// <param name="itemChanged">true => item changed while async request was in progress; false otherwise</param>
/// <returns>a deserialized representation of the data at the zeroth index (index 0) of the response array</returns>

var createDeserializedDataWithDictionary = function createDeserializedDataWithDictionary(responseData, itemChanged) {
  var deserializedData = JSON.parse(responseData[0]);

  if (itemChanged) {
    deserializedData.error = true;
    deserializedData.errorCode = 9030
    /* APICallFailedDueToItemChange */
    ;
  } else if (responseData.length > 1 && responseData[1] !== 0) {
    // Outlook puts the error code in a parameter of the array. OWA puts the error code in the
    // dictionary. To keep things consistent, copy the error code from the data into the dictionary.
    deserializedData.error = true;
    deserializedData.errorCode = responseData[1]; // responseData should always be of length 3+ in Outlook-win32-16.02+ (when itemNumber was added),
    // checking anyways to make sure.

    if (responseData.length > 2) {
      // API's may chose to put diagnostics key for extra error details
      // Extract that here too
      var diagnosticsData = JSON.parse(responseData[2]);
      deserializedData.diagnostics = diagnosticsData["Diagnostics"];
    }
  } else {
    // No error.
    deserializedData.error = false;
  }

  return deserializedData;
}; /// <summary>
/// Helper method for creating a deserialized representation of the response of an async API call to Outlook,
/// where the zeroth index of the response array is an int (which represents the error code from the native client).
/// </summary>
/// <param name="responseData">the response of an async API call to Outlook</param>
/// <param name="itemChanged">true => item changed while async request was in progress; false otherwise</param>
/// <returns>a deserialized representation of the data at the zeroth index (index 0) of the response array</returns>


var createDeserializedDataWithInt = function createDeserializedDataWithInt(responseData, itemChanged) {
  var deserializedData = {};
  deserializedData.error = true;
  deserializedData.errorCode = responseData[0];
  return deserializedData;
};
// CONCATENATED MODULE: ./src/api/standardInvokeHostMethod.ts







var standardInvokeHostMethod_OSF = __webpack_require__(1);

function standardInvokeHostMethod(dispid, userContext, callback, data, format, customResponse) {
  standardInvokeHostMethod_invokeHostMethod(dispid, data, function (resultCode, response) {
    if (callback) {
      var asyncResult = void 0;
      var wasSuccessful = true;

      if (typeof response === "object" && response !== null) {
        if (response.wasSuccessful !== undefined) {
          wasSuccessful = response.wasSuccessful;
        }

        if (response.error !== undefined || response.errorCode !== undefined || response.data !== undefined) {
          if (!response.error) {
            var formattedData = format ? format(response.data) : response.data;
            asyncResult = createAsyncResult(formattedData, standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorCode.Success, 0, userContext);
          } else {
            var errorCode = response.errorCode;
            asyncResult = createAsyncResult(undefined, standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, errorCode, userContext);
          }
        }

        if (customResponse) {
          asyncResult = customResponse(response, userContext, resultCode);
        }

        if (!asyncResult && resultCode !== InvokeResultCode.noError) {
          // If there was an error in the invoke, report a generic error.  There is little we can do.
          asyncResult = createAsyncResult(undefined, standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, standardInvokeHostMethod_OSF.DDA.ErrorCodes.InternalFormatError, userContext);
        } // The API is not implemented. On-prem OWA and JsMVVM follow this behavior when a method is not implemented.


        if (!asyncResult && resultCode === InvokeResultCode.noError && wasSuccessful === false) {
          asyncResult = createAsyncResult(undefined, standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, standardInvokeHostMethod_OSF.DDA.ErrorCodes.OoeOperationNotSupported, userContext);
        } // We tried our best to provide a valid response
        // If it's still undefined here, the host most likely sent an undefined response due to a hack in the JSOM layer


        callback(asyncResult);
      }
    }
  });
}
function createAsyncResult(value, errorCode, detailedErrorCode, userContext, errorMessage) {
  var initArgs = {};
  var errorArgs;
  initArgs[standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.Properties.Value] = value;
  initArgs[standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.Properties.Context] = userContext;

  if (standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorCode.Success !== errorCode) {
    errorArgs = {};
    var errorProperties = getErrorArgs(detailedErrorCode);
    errorArgs[standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorProperties.Name] = errorProperties.name;
    errorArgs[standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorProperties.Message] = !errorMessage ? errorProperties.message : errorMessage;
    errorArgs[standardInvokeHostMethod_OSF.DDA.AsyncResultEnum.ErrorProperties.Code] = detailedErrorCode;
  }

  return new standardInvokeHostMethod_OSF.DDA.AsyncResult(initArgs, errorArgs);
}
var standardInvokeHostMethod_invokeHostMethod = function invokeHostMethod(dispid, data, responseCallback) {
  var start = performance && performance.now(); // TODO: Fix instrumentation

  var invokeResponseCallback = function invokeResponseCallback(resultCode, resultData) {
    if (standardInvokeHostMethod_OSF.AppTelemetry) {
      var detailedErroCode = getErrorForTelemetry(resultCode, resultData);
      var end = performance.now();
      standardInvokeHostMethod_OSF.AppTelemetry.onMethodDone(dispid, null, end - start, detailedErroCode);
    }

    if (responseCallback) {
      responseCallback(resultCode, resultData);
    }
  };

  if (standardInvokeHostMethod_OSF.AppName.OutlookWebApp === getAppName()) {
    var args = {
      ApiParams: data,
      MethodData: {
        ControlId: standardInvokeHostMethod_OSF._OfficeAppFactory.getId(),
        DispatchId: dispid
      }
    };

    if (dispid === 1
    /* getInitialData */
    ) {
        standardInvokeHostMethod_OSF._OfficeAppFactory.getClientEndPoint().invoke("GetInitialData", invokeResponseCallback, args);
      } else {
      standardInvokeHostMethod_OSF._OfficeAppFactory.getClientEndPoint().invoke("ExecuteMethod", invokeResponseCallback, args);
    }
  } else if (!isOwaOnly(dispid)) {
    callOutlookNativeDispatcher_callOutlookNativeDispatcher(dispid, data, responseCallback);
  } else {
    responseCallback(InvokeResultCode.errorHandlingRequest, null);
  }
};
// CONCATENATED MODULE: ./src/utils/getPermissionLevel.ts

var getPermissionLevel_getPermissionLevel = function getPermissionLevel() {
  return getInitialDataProp("permissionLevel");
};
// CONCATENATED MODULE: ./src/utils/checkPermissionsAndThrow.ts



function checkPermissionsAndThrow(permissions, namespace) {
  if (getPermissionLevel_getPermissionLevel() < permissions) {
    createError(Object(ExtensibilityStrings["a" /* getString */])("l_ElevatedPermissionNeededForMethod_Text").replace("{0}", namespace));
  }
}
// CONCATENATED MODULE: ./src/utils/parseCommonArgs.ts


function parseCommonArgs(args, isCallbackRequired, tryLegacy) {
  var result = {};

  if (tryLegacy) {
    result = tryParseLegacy(args);

    if (result.callback && result.asyncContext) {
      return result;
    }
  }

  if (args.length === 1) {
    if (typeof args[0] === "function") {
      result.callback = args[0];
    } else if (typeof args[0] === "object") {
      result.options = args[0];
    } else {
      throw createArgumentTypeError();
    }
  } else if (args.length === 2) {
    if (typeof args[0] !== "object") {
      throw createArgumentError("options");
    }

    if (typeof args[1] !== "function") {
      throw createArgumentError("callback");
    }

    result.callback = args[1];
    result.options = args[0];
  } else if (args.length !== 0) {
    throw createParameterCountError(Object(ExtensibilityStrings["a" /* getString */])("l_ParametersNotAsExpected_Text"));
  }

  if (isCallbackRequired && !result.callback) {
    throw createNullArgumentError("callback");
  }

  if (result.options && result.options.asyncContext) {
    result.asyncContext = result.options.asyncContext;
  }

  return result;
}

function tryParseLegacy(args) {
  var result = {}; // Handling 0 parameters or more than 2 are not needed.
  // 0 parameters case will be handled by CommonParameters.Parse
  // More than 2 parameters are not expected for legacy parameters.

  if (args.length === 1 || args.length === 2) {
    if (typeof args[0] !== "function") {
      // If the developer has a first parameter, it has to be a non-null callback for legacy parameters
      return result;
    }

    result.callback = args[0];

    if (args.length === 2) {
      result.asyncContext = args[1];
    }

    return result;
  }

  return result;
}
// CONCATENATED MODULE: ./src/validation/recipientConstants.ts
var RecipientFields;

(function (RecipientFields) {
  RecipientFields[RecipientFields["to"] = 0] = "to";
  RecipientFields[RecipientFields["cc"] = 1] = "cc";
  RecipientFields[RecipientFields["bcc"] = 2] = "bcc";
  RecipientFields[RecipientFields["requiredAttendees"] = 0] = "requiredAttendees";
  RecipientFields[RecipientFields["optionalAttendees"] = 1] = "optionalAttendees";
})(RecipientFields || (RecipientFields = {}));

var displayNameLengthLimit = 255;
var recipientsLimit = 100;
var recipientConstants_totalRecipientsLimit = 500;
var maxSmtpLength = 571;
// CONCATENATED MODULE: ./src/validation/displayConstants.ts
var maxLocationLength = 255;
var maxBodyLength = 32 * 1024;
var maxSubjectLength = 255;
var maxRecipients = 100; //Attachment Constants
// The maximum length for an attachment name.

var MaxAttachmentNameLength = 255; // The maximum length for a url.

var MaxUrlLength = 2048; // The maximum length for an Item ID

var MaxItemIdLength = 200; // The maximum length for an attachment index used for remove

var MaxRemoveIdLength = 200; // Time out to use for addItemAttachmentAsync time out.
// This is used by ODP client end point to determine the timeout. (10 minutes)

var AddItemAttachmentClientEndPointTimeoutInMilliseconds = 600000;
// CONCATENATED MODULE: ./src/utils/throwOnOutOfRange.ts

function throwOnOutOfRange(value, minValue, maxValue, argumentName) {
  if (value < minValue || value > maxValue) {
    throw createArgumentOutOfRange(String(argumentName));
  }
}
// CONCATENATED MODULE: ./src/utils/isNullOrUndefined.ts
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}
// CONCATENATED MODULE: ./src/validation/validateDisplayForms.ts





function validateRecipientEmails(emailset, name) {
  if (!(emailset instanceof Array)) {
    throw createArgumentTypeError("name");
  }

  throwOnOutOfRange(emailset.length, 0, maxRecipients, "{0}.length".replace("{0}", name));
}
function normalizeRecipientEmails(emailset, name) {
  var originalAttendees = emailset;
  var updatedAttendees = []; // Normalize each element that is an EmailAddressDetails in the array to a string containing an email address

  for (var i = 0; i < originalAttendees.length; i++) {
    if (typeof originalAttendees[i] === "object") {
      throwOnInvalidEmailAddressDetails(originalAttendees[i]);
      updatedAttendees[i] = originalAttendees[i].emailAddress;

      if (typeof updatedAttendees[i] !== "string") {
        throw createArgumentError("{0}[{1}]".replace(name, String(i)));
      }
    } else {
      if (!(typeof originalAttendees[i] === "string")) {
        throw createArgumentError("{0}[{1}]".replace(name, String(i)));
      }

      updatedAttendees[i] = originalAttendees[i];
    }
  }

  return updatedAttendees;
}
function throwOnInvalidEmailAddressDetails(originalAttendee) {
  if (!isNullOrUndefined(originalAttendee.displayName)) {
    if (typeof originalAttendee.displayName === "string" && originalAttendee.displayName.length > displayNameLengthLimit) {
      throw createArgumentOutOfRange("displayName");
    }
  }

  if (!isNullOrUndefined(originalAttendee.emailAddress)) {
    if (typeof originalAttendee.emailAddress === "string" && originalAttendee.emailAddress.length > maxSmtpLength) {
      throw createArgumentOutOfRange("emailAddress");
    }
  }

  if (!isNullOrUndefined(originalAttendee.appointmentResponse)) {
    if (typeof originalAttendee.appointmentResponse === "string") {
      throw createArgumentOutOfRange("appointmentResponse");
    }
  }

  if (!isNullOrUndefined(originalAttendee.recipientType)) {
    if (typeof originalAttendee.recipientType === "string") {
      throw createArgumentOutOfRange("recipientType");
    }
  }

  throw createArgumentError("originalAttendee");
}
function validateDisplayFormParameters(itemId) {
  if (typeof itemId === "string") {
    throwOnInvalidItemId(itemId);
  } else {
    throw createArgumentTypeError("itemId");
  }
}

function throwOnInvalidItemId(itemId) {
  if (isNullOrUndefined(itemId) || itemId === "") {
    throw createNullArgumentError("itemId");
  }
}
// CONCATENATED MODULE: ./src/methods/displayAppointmentForm.ts




function displayAppointmentForm(itemId) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayAppointmentForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    itemId: itemId
  };
  validateParameters(parameters);
  standardInvokeHostMethod(9
  /* displayAppointmentForm */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function validateParameters(parameters) {
  validateDisplayFormParameters(parameters.itemId);
}
// CONCATENATED MODULE: ./src/methods/displayMessageForm.ts




function displayMessageForm(itemId) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayMessageForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    itemId: itemId
  };
  displayMessageForm_validateParameters(parameters);
  standardInvokeHostMethod(8
  /* displayMessageForm */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function displayMessageForm_validateParameters(parameters) {
  validateDisplayFormParameters(parameters.itemId);
}
// CONCATENATED MODULE: ./src/utils/validateOptionalStringParameter.ts


function validateOptionalStringParameter(value, minLength, maxlength, name) {
  if (typeof value === "string") {
    throwOnOutOfRange(value.length, minLength, maxlength, name);
  } else {
    throw createArgumentError(String(name));
  }
}
// CONCATENATED MODULE: ./src/methods/displayNewAppointmentForm.ts








 //NIT:  resources: Array<string>; is in documentation but deprecated, So removed as a parameter here

function displayNewAppointmentForm(parameters) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayNewAppointmentForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  displayNewAppointmentForm_validateParameters(parameters);
  var updatedParameters = normalizeParameters(parameters);
  standardInvokeHostMethod(7
  /* displayNewAppointmentForm */
  , commonParameters.asyncContext, commonParameters.callback, updatedParameters, undefined);
}

function displayNewAppointmentForm_validateParameters(parameters) {
  if (!isNullOrUndefined(parameters.requiredAttendees)) {
    validateRecipientEmails(parameters.requiredAttendees, "requiredAttendees");
  }

  if (!isNullOrUndefined(parameters.optionalAttendees)) {
    validateRecipientEmails(parameters.optionalAttendees, "optionalAttendees");
  }

  if (!isNullOrUndefined(parameters.location)) {
    validateOptionalStringParameter(parameters.location, 0, maxLocationLength, "location");
  }

  if (!isNullOrUndefined(parameters.body)) {
    validateOptionalStringParameter(parameters.body, 0, maxBodyLength, "body");
  }

  if (!isNullOrUndefined(parameters.subject)) {
    validateOptionalStringParameter(parameters.subject, 0, maxSubjectLength, "subject");
  }

  if (!isNullOrUndefined(parameters.start)) {
    if (!(parameters.start instanceof Date)) {
      throw createArgumentError("start");
    }

    if (!isNullOrUndefined(parameters.end)) {
      if (!(parameters.end instanceof Date)) {
        throw createArgumentError("end");
      }

      if (parameters.end < parameters.start) {
        throw createArgumentError("end", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidEventDates_Text"));
      }
    }
  }
}

function normalizeParameters(parameters) {
  var normalizedRequiredAttendees = null;
  var normalizedOptionalAttendees = null;

  if (!isNullOrUndefined(parameters.requiredAttendees)) {
    normalizedRequiredAttendees = normalizeRecipientEmails(parameters.requiredAttendees, "requiredAttendees");
  }

  if (!isNullOrUndefined(parameters.optionalAttendees)) {
    normalizedOptionalAttendees = normalizeRecipientEmails(parameters.optionalAttendees, "optionalAttendees");
  }

  if (!isNullOrUndefined(parameters.start)) {
    // Rewrite time into ticks. This avoids problems with sending Date via XDM (as seen in Office15:3080326)
    // Outlook also wants this in ticks anyways.
    var startDate = parameters.start;
    parameters.start = startDate.getTime();
  }

  if (!isNullOrUndefined(parameters.end)) {
    var endDate = parameters.end;
    parameters.end = endDate.getTime();
  } // Deep copy to not modify what the caller passed in


  var updatedParameters = JSON.parse(JSON.stringify(parameters));

  if (normalizedRequiredAttendees || normalizedOptionalAttendees) {
    if (!isNullOrUndefined(parameters.requiredAttendees)) {
      updatedParameters.requiredAttendees = normalizedRequiredAttendees;
    }

    if (!isNullOrUndefined(parameters.optionalAttendees)) {
      updatedParameters.optionalAttendees = normalizedOptionalAttendees;
    }
  }

  return updatedParameters;
}
// CONCATENATED MODULE: ./src/utils/OutlookEnums.ts
// ---------------------------------------------------------------------
// Definition of public enums.
// ---------------------------------------------------------------------

/* eslint-disable */
var MailboxEnums = {};
MailboxEnums.EntityType = {
  MeetingSuggestion: "meetingSuggestion",
  TaskSuggestion: "taskSuggestion",
  Address: "address",
  EmailAddress: "emailAddress",
  Url: "url",
  PhoneNumber: "phoneNumber",
  Contact: "contact",
  FlightReservations: "flightReservations",
  ParcelDeliveries: "parcelDeliveries"
};
MailboxEnums.ItemType = {
  Message: "message",
  Appointment: "appointment"
};
MailboxEnums.ResponseType = {
  None: "none",
  Organizer: "organizer",
  Tentative: "tentative",
  Accepted: "accepted",
  Declined: "declined"
};
MailboxEnums.RecipientType = {
  Other: "other",
  DistributionList: "distributionList",
  User: "user",
  ExternalUser: "externalUser"
};
MailboxEnums.AttachmentType = {
  File: "file",
  Item: "item",
  Cloud: "cloud"
};
MailboxEnums.AttachmentStatus = {
  Added: "added",
  Removed: "removed"
};
MailboxEnums.AttachmentContentFormat = {
  Base64: "base64",
  Url: "url",
  Eml: "eml",
  ICalendar: "iCalendar"
};
MailboxEnums.BodyType = {
  Text: "text",
  Html: "html"
};
MailboxEnums.ItemNotificationMessageType = {
  ProgressIndicator: "progressIndicator",
  InformationalMessage: "informationalMessage",
  ErrorMessage: "errorMessage",
  InsightMessage: "insightMessage"
};
MailboxEnums.Folder = {
  Inbox: "inbox",
  Junk: "junk",
  DeletedItems: "deletedItems"
};
var CoercionType = {
  Text: "text",
  Html: "html"
};
MailboxEnums.UserProfileType = {
  Office365: "office365",
  OutlookCom: "outlookCom",
  Enterprise: "enterprise"
};
MailboxEnums.RestVersion = {
  v1_0: "v1.0",
  v2_0: "v2.0",
  Beta: "beta"
};
MailboxEnums.ModuleType = {
  Addins: "addins"
};
MailboxEnums.ActionType = {
  ShowTaskPane: "showTaskPane"
};
MailboxEnums.Days = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun",
  Weekday: "weekday",
  WeekendDay: "weekendDay",
  Day: "day"
};
MailboxEnums.WeekNumber = {
  First: "first",
  Second: "second",
  Third: "third",
  Fourth: "fourth",
  Last: "last"
};
MailboxEnums.RecurrenceType = {
  Daily: "daily",
  Weekday: "weekday",
  Weekly: "weekly",
  Monthly: "monthly",
  Yearly: "yearly"
};
MailboxEnums.Month = {
  Jan: "jan",
  Feb: "feb",
  Mar: "mar",
  Apr: "apr",
  May: "may",
  Jun: "jun",
  Jul: "jul",
  Aug: "aug",
  Sep: "sep",
  Oct: "oct",
  Nov: "nov",
  Dec: "dec"
}; // These MUST be the same as the DelegatePermissions enumeration
// defined in //depot/devmain/outlook/outllib/webext/webextom.cpp.

MailboxEnums.DelegatePermissions = {
  Read: 0x00000001,
  Write: 0x00000002,
  DeleteOwn: 0x00000004,
  DeleteAll: 0x00000008,
  EditOwn: 0x00000010,
  EditAll: 0x00000020 // 32

};
MailboxEnums.TimeZone = {
  AfghanistanStandardTime: "Afghanistan Standard Time",
  AlaskanStandardTime: "Alaskan Standard Time",
  AleutianStandardTime: "Aleutian Standard Time",
  AltaiStandardTime: "Altai Standard Time",
  ArabStandardTime: "Arab Standard Time",
  ArabianStandardTime: "Arabian Standard Time",
  ArabicStandardTime: "Arabic Standard Time",
  ArgentinaStandardTime: "Argentina Standard Time",
  AstrakhanStandardTime: "Astrakhan Standard Time",
  AtlanticStandardTime: "Atlantic Standard Time",
  AUSCentralStandardTime: "AUS Central Standard Time",
  AusCentralWStandardTime: "Aus Central W. Standard Time",
  AUSEasternStandardTime: "AUS Eastern Standard Time",
  AzerbaijanStandardTime: "Azerbaijan Standard Time",
  AzoresStandardTime: "Azores Standard Time",
  BahiaStandardTime: "Bahia Standard Time",
  BangladeshStandardTime: "Bangladesh Standard Time",
  BelarusStandardTime: "Belarus Standard Time",
  BougainvilleStandardTime: "Bougainville Standard Time",
  CanadaCentralStandardTime: "Canada Central Standard Time",
  CapeVerdeStandardTime: "Cape Verde Standard Time",
  CaucasusStandardTime: "Caucasus Standard Time",
  CenAustraliaStandardTime: "Cen. Australia Standard Time",
  CentralAmericaStandardTime: "Central America Standard Time",
  CentralAsiaStandardTime: "Central Asia Standard Time",
  CentralBrazilianStandardTime: "Central Brazilian Standard Time",
  CentralEuropeStandardTime: "Central Europe Standard Time",
  CentralEuropeanStandardTime: "Central European Standard Time",
  CentralPacificStandardTime: "Central Pacific Standard Time",
  CentralStandardTime: "Central Standard Time",
  CentralStandardTime_Mexico: "Central Standard Time (Mexico)",
  ChathamIslandsStandardTime: "Chatham Islands Standard Time",
  ChinaStandardTime: "China Standard Time",
  CubaStandardTime: "Cuba Standard Time",
  DatelineStandardTime: "Dateline Standard Time",
  EAfricaStandardTime: "E. Africa Standard Time",
  EAustraliaStandardTime: "E. Australia Standard Time",
  EEuropeStandardTime: "E. Europe Standard Time",
  ESouthAmericaStandardTime: "E. South America Standard Time",
  EasterIslandStandardTime: "Easter Island Standard Time",
  EasternStandardTime: "Eastern Standard Time",
  EasternStandardTime_Mexico: "Eastern Standard Time (Mexico)",
  EgyptStandardTime: "Egypt Standard Time",
  EkaterinburgStandardTime: "Ekaterinburg Standard Time",
  FijiStandardTime: "Fiji Standard Time",
  FLEStandardTime: "FLE Standard Time",
  GeorgianStandardTime: "Georgian Standard Time",
  GMTStandardTime: "GMT Standard Time",
  GreenlandStandardTime: "Greenland Standard Time",
  GreenwichStandardTime: "Greenwich Standard Time",
  GTBStandardTime: "GTB Standard Time",
  HaitiStandardTime: "Haiti Standard Time",
  HawaiianStandardTime: "Hawaiian Standard Time",
  IndiaStandardTime: "India Standard Time",
  IranStandardTime: "Iran Standard Time",
  IsraelStandardTime: "Israel Standard Time",
  JordanStandardTime: "Jordan Standard Time",
  KaliningradStandardTime: "Kaliningrad Standard Time",
  KamchatkaStandardTime: "Kamchatka Standard Time",
  KoreaStandardTime: "Korea Standard Time",
  LibyaStandardTime: "Libya Standard Time",
  LineIslandsStandardTime: "Line Islands Standard Time",
  LordHoweStandardTime: "Lord Howe Standard Time",
  MagadanStandardTime: "Magadan Standard Time",
  MagallanesStandardTime: "Magallanes Standard Time",
  MarquesasStandardTime: "Marquesas Standard Time",
  MauritiusStandardTime: "Mauritius Standard Time",
  MidAtlanticStandardTime: "Mid-Atlantic Standard Time",
  MiddleEastStandardTime: "Middle East Standard Time",
  MontevideoStandardTime: "Montevideo Standard Time",
  MoroccoStandardTime: "Morocco Standard Time",
  MountainStandardTime: "Mountain Standard Time",
  MountainStandardTime_Mexico: "Mountain Standard Time (Mexico)",
  MyanmarStandardTime: "Myanmar Standard Time",
  NCentralAsiaStandardTime: "N. Central Asia Standard Time",
  NamibiaStandardTime: "Namibia Standard Time",
  NepalStandardTime: "Nepal Standard Time",
  NewZealandStandardTime: "New Zealand Standard Time",
  NewfoundlandStandardTime: "Newfoundland Standard Time",
  NorfolkStandardTime: "Norfolk Standard Time",
  NorthAsiaEastStandardTime: "North Asia East Standard Time",
  NorthAsiaStandardTime: "North Asia Standard Time",
  NorthKoreaStandardTime: "North Korea Standard Time",
  OmskStandardTime: "Omsk Standard Time",
  PacificSAStandardTime: "Pacific SA Standard Time",
  PacificStandardTime: "Pacific Standard Time",
  PacificStandardTime_Mexico: "Pacific Standard Time (Mexico)",
  PakistanStandardTime: "Pakistan Standard Time",
  ParaguayStandardTime: "Paraguay Standard Time",
  RomanceStandardTime: "Romance Standard Time",
  RussiaTimeZone10: "Russia Time Zone 10",
  RussiaTimeZone11: "Russia Time Zone 11",
  RussiaTimeZone3: "Russia Time Zone 3",
  RussianStandardTime: "Russian Standard Time",
  SAEasternStandardTime: "SA Eastern Standard Time",
  SAPacificStandardTime: "SA Pacific Standard Time",
  SAWesternStandardTime: "SA Western Standard Time",
  SaintPierreStandardTime: "Saint Pierre Standard Time",
  SakhalinStandardTime: "Sakhalin Standard Time",
  SamoaStandardTime: "Samoa Standard Time",
  SaratovStandardTime: "Saratov Standard Time",
  SEAsiaStandardTime: "SE Asia Standard Time",
  SingaporeStandardTime: "Singapore Standard Time",
  SouthAfricaStandardTime: "South Africa Standard Time",
  SriLankaStandardTime: "Sri Lanka Standard Time",
  SudanStandardTime: "Sudan Standard Time",
  SyriaStandardTime: "Syria Standard Time",
  TaipeiStandardTime: "Taipei Standard Time",
  TasmaniaStandardTime: "Tasmania Standard Time",
  TocantinsStandardTime: "Tocantins Standard Time",
  TokyoStandardTime: "Tokyo Standard Time",
  TomskStandardTime: "Tomsk Standard Time",
  TongaStandardTime: "Tonga Standard Time",
  TransbaikalStandardTime: "Transbaikal Standard Time",
  TurkeyStandardTime: "Turkey Standard Time",
  TurksAndCaicosStandardTime: "Turks And Caicos Standard Time",
  UlaanbaatarStandardTime: "Ulaanbaatar Standard Time",
  USEasternStandardTime: "US Eastern Standard Time",
  USMountainStandardTime: "US Mountain Standard Time",
  UTC: "UTC",
  UTCPLUS12: "UTC+12",
  UTCPLUS13: "UTC+13",
  UTCMINUS02: "UTC-02",
  UTCMINUS08: "UTC-08",
  UTCMINUS09: "UTC-09",
  UTCMINUS11: "UTC-11",
  VenezuelaStandardTime: "Venezuela Standard Time",
  VladivostokStandardTime: "Vladivostok Standard Time",
  WAustraliaStandardTime: "W. Australia Standard Time",
  WCentralAfricaStandardTime: "W. Central Africa Standard Time",
  WEuropeStandardTime: "W. Europe Standard Time",
  WMongoliaStandardTime: "W. Mongolia Standard Time",
  WestAsiaStandardTime: "West Asia Standard Time",
  WestBankStandardTime: "West Bank Standard Time",
  WestPacificStandardTime: "West Pacific Standard Time",
  YakutskStandardTime: "Yakutsk Standard Time"
};
MailboxEnums.LocationType = {
  Custom: "custom",
  Room: "room"
}; // These mappings for presets to colors are picked from Graph defined here:
// https://docs.microsoft.com/en-us/graph/api/resources/outlookcategory?view=graph-rest-1.0

MailboxEnums.CategoryColor = {
  None: "None",
  Preset0: "Preset0",
  Preset1: "Preset1",
  Preset2: "Preset2",
  Preset3: "Preset3",
  Preset4: "Preset4",
  Preset5: "Preset5",
  Preset6: "Preset6",
  Preset7: "Preset7",
  Preset8: "Preset8",
  Preset9: "Preset9",
  Preset10: "Preset10",
  Preset11: "Preset11",
  Preset12: "Preset12",
  Preset13: "Preset13",
  Preset14: "Preset14",
  Preset15: "Preset15",
  Preset16: "Preset16",
  Preset17: "Preset17",
  Preset18: "Preset18",
  Preset19: "Preset19",
  Preset20: "Preset20",
  Preset21: "Preset21",
  Preset22: "Preset22",
  Preset23: "Preset23",
  Preset24: "Preset24" // DarkMaroon/DarkCranberry

}; // End of public enums
// CONCATENATED MODULE: ./src/utils/throwOnInvalidRestVersion.ts

 // Validates the Rest Version Parameter

function throwOnInvalidRestVersion(restVersion) {
  if (restVersion === null || restVersion === undefined) {
    throw createNullArgumentError(restVersion);
  } //Check supported Rest Versions


  if (restVersion !== MailboxEnums.RestVersion.v1_0 && restVersion !== MailboxEnums.RestVersion.v2_0 && restVersion !== MailboxEnums.RestVersion.Beta) {
    throw createArgumentError(restVersion);
  }
}
// CONCATENATED MODULE: ./src/utils/convertToRestId.ts


function convertToRestId(itemId, restVersion) {
  if (itemId === null || itemId === undefined) {
    throw createNullArgumentError(itemId);
  }

  throwOnInvalidRestVersion(restVersion);
  return itemId.replace(new RegExp("[/]", "g"), "-").replace(new RegExp("[+]", "g"), "_");
}
// CONCATENATED MODULE: ./src/utils/convertToEwsId.ts


function convertToEwsId(itemId, restVersion) {
  if (itemId === null || itemId === undefined) {
    throw createNullArgumentError(itemId);
  }

  throwOnInvalidRestVersion(restVersion);
  return itemId.replace(new RegExp("[-]", "g"), "/").replace(new RegExp("[_]", "g"), "+");
}
// CONCATENATED MODULE: ./src/methods/displayNewMessageForm.ts













function displayNewMessageForm(parameters) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayNewMessageForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  displayNewMessageForm_validateParameters(parameters);
  var updatedParameters = normailzeParameters(parameters);
  standardInvokeHostMethod(44
  /* displayNewMessageForm */
  , commonParameters.asyncContext, commonParameters.callback, updatedParameters === null || updatedParameters === undefined ? parameters : updatedParameters, undefined);
}

function displayNewMessageForm_validateParameters(parameters) {
  if (parameters !== null && parameters !== null) {
    if (!isNullOrUndefined(parameters.toRecipients)) {
      validateRecipientEmails(parameters.toRecipients, "toRecipients");
    }

    if (!isNullOrUndefined(parameters.ccRecipients)) {
      validateRecipientEmails(parameters.ccRecipients, "ccRecipients");
    }

    if (!isNullOrUndefined(parameters.bccRecipients)) {
      validateRecipientEmails(parameters.bccRecipients, "bccRecipients");
    }

    if (!isNullOrUndefined(parameters.htmlBody)) {
      validateOptionalStringParameter(parameters.htmlBody, 0, maxBodyLength, "htmlBody");
    }

    if (!isNullOrUndefined(parameters.subject)) {
      validateOptionalStringParameter(parameters.subject, 0, maxSubjectLength, "subject");
    }
  }
}

function normailzeParameters(parameters) {
  // Deep copy to not modify what the caller passed in
  var updatedParameters = JSON.parse(JSON.stringify(parameters));

  if (!isNullOrUndefined(parameters)) {
    if (parameters.toRecipients) {
      updatedParameters.toRecipients = normalizeRecipientEmails(parameters.toRecipients, "toRecipients");
    }

    if (parameters.ccRecipients) {
      updatedParameters.ccRecipients = normalizeRecipientEmails(parameters.ccRecipients, "ccRecipients");
    }

    if (parameters.bccRecipients) {
      updatedParameters.bccRecipients = normalizeRecipientEmails(parameters.bccRecipients, "bccRecipients");
    }

    var attachments = getAttachments(parameters);

    if (parameters.attachments) {
      updatedParameters.attachments = createAttachmentsDataForHost(attachments);
    }
  }

  return updatedParameters;
}
function getAttachments(data) {
  var attachments = [];

  if (data.attachments) {
    attachments = data.attachments;
    throwOnInvalidAttachmentsArray(attachments);
  }

  return attachments;
}
function throwOnInvalidAttachmentsArray(attachments) {
  if (!isNullOrUndefined(attachments) && !(attachments instanceof Array)) {
    throw createArgumentError("attachments");
  }
} // Create an array containing all the attachment data to be sent to the API host.
// This array is created from another array containing raw data from the calling Mail App.

function createAttachmentsDataForHost(attachments) {
  var attachmentsData = [];

  for (var i = 0; i < attachments.length; i++) {
    if (typeof attachments[i] === "object") {
      var attachment = attachments[i];
      throwOnInvalidAttachment(attachment);
      attachmentsData.push(createAttachmentData(attachment));
    } else {
      throw createArgumentError("attachments");
    }
  }

  return attachmentsData;
}
function throwOnInvalidAttachment(attachment) {
  if (typeof attachment !== "object") {
    throw createArgumentError("attachments");
  } // Each attachment must have a type and a name


  if (!attachment.type || !attachment.name) {
    throw createArgumentError("attachments");
  } // each attachment must have a url or an itemId (depending on the type)


  if (!attachment.url && !attachment.itemId) {
    throw createArgumentError("attachments");
  }
} // Create a single attachment data to be sent to the API host.

function createAttachmentData(attachment) {
  var attachmentData = null;

  if (attachment.type === MailboxEnums.AttachmentType.File) {
    var url = attachment.url;
    var name_1 = attachment.name;
    var isInline = !!attachment.isInline;
    throwOnInvalidAttachmentUrlOrName(url, name_1);
    attachmentData = [MailboxEnums.AttachmentType.File, name_1, url, isInline];
  } else if (attachment.type === MailboxEnums.AttachmentType.Item) {
    var itemId = getItemIdBasedOnHost(attachment.itemId);
    var name_2 = attachment.name;
    throwOnInvalidAttachmentItemIdOrName(itemId, name_2);
    attachmentData = [MailboxEnums.AttachmentType.Item, name_2, itemId];
  } else {
    throw createArgumentError("attachments");
  }

  return attachmentData;
}
function throwOnInvalidAttachmentUrlOrName(url, name) {
  if (!(typeof url === "string") && !(typeof name === "string")) {
    throw createArgumentError("attachments");
  }

  if (url.length > MaxUrlLength) {
    throw createArgumentOutOfRange("attachments", url.length, Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentUrlTooLong_Text"));
  }

  throwOnInvalidAttachmentName(name);
} // Throws if the name of an attachment is over the allowed limit.

function throwOnInvalidAttachmentName(name) {
  if (name.length > MaxAttachmentNameLength) {
    throw createArgumentOutOfRange("attachments", name.length, Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentNameTooLong_Text"));
  }
}
function getItemIdBasedOnHost(itemId) {
  if (getInitialDataProp("isRestIdSupported")) {
    return convertToRestId(itemId, MailboxEnums.RestVersion.v1_0);
  }

  return convertToEwsId(itemId, MailboxEnums.RestVersion.v1_0);
}
function throwOnInvalidAttachmentItemIdOrName(itemId, name) {
  if (!(typeof itemId === "string") || !(typeof name === "string")) {
    throw createArgumentError("attachments");
  }

  if (itemId.length > MaxItemIdLength) {
    throw createArgumentOutOfRange("attachments", itemId.length, Object(ExtensibilityStrings["a" /* getString */])("l_AttachmentItemIdTooLong_Text"));
  }

  throwOnInvalidAttachmentName(name);
}
// CONCATENATED MODULE: ./src/utils/handleTokenResponse.ts





var handleTokenResponse_OSF = __webpack_require__(1);

function handleTokenResponse(response, context, resultCode) {
  var asyncResult = undefined; // Outlook Desktop returns result code as Undefined

  if (!!resultCode && resultCode !== InvokeResultCode.noError) {
    // There was a script error in host communication layer processing request or response...
    asyncResult = createAsyncResult(undefined, handleTokenResponse_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9017
    /* AccessRestricted */
    , context, Object(ExtensibilityStrings["a" /* getString */])("l_InternalProtocolError_Text").replace("{0}", resultCode));
  } else {
    // If there's an error code and it is the "API call failed due to item change" error code, return an error message.
    // Returning an error message here means that we will dump whatever data is in the responseDictionary to ensure that we do
    // send data from a previously selected item to the calling app. This is only needed for WinOutlook and potentially MacOutlook.
    if (getAppName() === handleTokenResponse_OSF.AppName.Outlook && response.error !== undefined && response.errorCode !== undefined && !!response.error && response.errorCode === 9030
    /* APICallFailedDueToItemChange */
    ) {
        // Return the error message.
        asyncResult = createAsyncResult(undefined, handleTokenResponse_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, response.errorCode, context, response.errorMessage);
      } else if (!!response.wasSuccessful) {
      // There isn't much in the response from the server, just:
      // 1. whether the request was successful,
      // 2  the token itself.
      asyncResult = createAsyncResult(response.token, handleTokenResponse_OSF.DDA.AsyncResultEnum.ErrorCode.Success, 0, context);
    } else {
      // Return the error message.
      asyncResult = createAsyncResult(undefined, handleTokenResponse_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, response.errorCode, context, response.errorMessage);
    } // Set the diagnostics object on the asyncResult to be paassed to the callback function


    if (response.diagnostics) {
      asyncResult.diagnostics = response.diagnostics;
    }
  }

  return asyncResult;
}
// CONCATENATED MODULE: ./src/methods/getCallbackToken.ts




function getCallbackToken() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.getCallbackTokenAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , true
  /* tryLegacy */
  );
  var isRest = false;

  if (commonParameters.options && !!commonParameters.options.isRest) {
    isRest = true;
  }

  standardInvokeHostMethod(12
  /* getCallbackToken */
  , commonParameters.asyncContext, commonParameters.callback, {
    isRest: isRest
  }, undefined, handleTokenResponse);
}
// CONCATENATED MODULE: ./src/methods/getUserIdentityToken.ts




function getUserIdentityToken() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.getUserIdentityToken");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , true
  /* tryLegacy */
  );
  standardInvokeHostMethod(2
  /* getUserIdentityToken */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined, handleTokenResponse);
}
// CONCATENATED MODULE: ./src/methods/makeEwsRequest.ts







var makeEwsRequest_OSF = __webpack_require__(1);

var maxEwsRequestSize = 1000000;
function makeEwsRequest(body) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(3
  /* readWriteMailbox */
  , "mailbox.makeEwsRequest");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , true
  /* tryLegacy */
  );

  if (body === null || body === undefined) {
    throw createNullArgumentError("data");
  }

  if (typeof body !== "string") {
    throw createArgumentTypeError("data", typeof body, "string");
  }

  if (body.length > maxEwsRequestSize) {
    throw createArgumentError("data", Object(ExtensibilityStrings["a" /* getString */])("l_EwsRequestOversized_Text"));
  }

  standardInvokeHostMethod(5
  /* makeEwsRequest */
  , commonParameters.asyncContext, commonParameters.callback, {
    body: body
  }, undefined, handleCustomResponse);
}

function handleCustomResponse(data, context, responseCode) {
  if (!!responseCode && responseCode !== InvokeResultCode.noError) {
    return createAsyncResult(undefined, makeEwsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9017
    /* AccessRestricted */
    , context, Object(ExtensibilityStrings["a" /* getString */])("l_InternalProtocolError_Text").replace("{0}", responseCode));
  } else if (data.wasProxySuccessful === false) {
    return createAsyncResult(undefined, makeEwsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9020
    /* GenericResponseError */
    , context, data.errorMessage);
  } else {
    return createAsyncResult(data.body, makeEwsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Success, 0, context);
  }
}
// CONCATENATED MODULE: ./src/utils/objectDefine.ts
var objectDefine = function objectDefine(o, props) {
  var keys = Object.keys(props);
  var values = keys.map(function (prop) {
    return {
      value: props[prop],
      writable: false
    };
  });
  var properties = {};
  keys.forEach(function (key, index) {
    properties[key] = values[index];
  });
  return Object.defineProperties(o, properties);
};
// CONCATENATED MODULE: ./src/api/getDiagnostics.ts



var getDiagnostics_OSF = __webpack_require__(1);

var getDiagnostics_getHostName = function getHostName() {
  var appName = getAppName();

  switch (appName) {
    case getDiagnostics_OSF.AppName.Outlook:
      return "Outlook";

    case getDiagnostics_OSF.AppName.OutlookWebApp:
      return "OutlookWebApp";

    case getDiagnostics_OSF.AppName.OutlookIOSApp:
      return "OutlookIOS";

    case getDiagnostics_OSF.AppName.OutlookAndroidApp:
      return "OutlookAndroid";

    default:
      return undefined;
  }
};

function getDiagnosticsSurface() {
  return objectDefine({}, {
    hostName: getDiagnostics_getHostName(),
    hostVersion: getInitialDataProp("hostVersion"),
    OWAView: getInitialDataProp("owaView")
  });
}
// CONCATENATED MODULE: ./src/api/getUserProfile.ts


function getUserProfileSurface() {
  return objectDefine({}, {
    accountType: getInitialDataProp("userProfileType"),
    displayName: getInitialDataProp("userDisplayName"),
    emailAddress: getInitialDataProp("userEmailAddress"),
    userTimezone: getInitialDataProp("userTimeZone")
  });
}
// CONCATENATED MODULE: ./src/validation/categoryConstants.ts

var CategoryColor = MailboxEnums.CategoryColor;
var categoriesCharacterLimit = 255;
var colorPresets = [CategoryColor.None, CategoryColor.Preset0, CategoryColor.Preset1, CategoryColor.Preset2, CategoryColor.Preset3, CategoryColor.Preset4, CategoryColor.Preset5, CategoryColor.Preset6, CategoryColor.Preset7, CategoryColor.Preset8, CategoryColor.Preset9, CategoryColor.Preset10, CategoryColor.Preset11, CategoryColor.Preset12, CategoryColor.Preset13, CategoryColor.Preset14, CategoryColor.Preset15, CategoryColor.Preset16, CategoryColor.Preset17, CategoryColor.Preset18, CategoryColor.Preset19, CategoryColor.Preset20, CategoryColor.Preset21, CategoryColor.Preset22, CategoryColor.Preset23, CategoryColor.Preset24];
// CONCATENATED MODULE: ./src/validation/validateCategoryDetailsArray.ts


function validateCategoryDetailsArray(categoryDetails) {
  if (!categoryDetails) {
    throw createArgumentError("categoryDetails");
  }

  if (!Array.isArray(categoryDetails)) {
    throw createArgumentTypeError("categoryDetails", typeof categoryDetails, typeof []);
  }

  if (categoryDetails.length === 0) {
    throw createArgumentError("categoryDetails");
  }

  categoryDetails.forEach(validateCategoryDetails);
}

function validateCategoryDetails(categoryDetails) {
  if (!categoryDetails) {
    throw createArgumentError("categoryDetails");
  }

  if (!categoryDetails.color || !categoryDetails.displayName) {
    throw createArgumentError("categoryDetails");
  }

  if (typeof categoryDetails.color !== "string") {
    throw createArgumentTypeError("categoryDetails.color", typeof categoryDetails.color, "string");
  }

  if (typeof categoryDetails.displayName !== "string") {
    throw createArgumentTypeError("categoryDetails.displayName", typeof categoryDetails.displayName, "string");
  }

  if (categoryDetails.displayName.length > categoriesCharacterLimit) {
    throw createArgumentOutOfRange("categoryDetails.displayName", categoryDetails.displayName.length);
  }

  if (colorPresets.indexOf(categoryDetails.color) === -1) {
    throw createArgumentError("categoryDetails.color");
  }
}
// CONCATENATED MODULE: ./src/methods/addMasterCategories.ts




function addMasterCategories(categoryDetails) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(3
  /* readWriteMailbox */
  , "masterCategories.addAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    categoryDetails: categoryDetails
  };
  validateCategoryDetailsArray(categoryDetails);
  standardInvokeHostMethod(161
  /* addMasterCategories */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/getMasterCategories.ts



function getMasterCategories() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(3
  /* readWriteMailbox */
  , "masterCategories.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(160
  /* getMasterCategories */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/validation/validateCategoryArray.ts


function validateCategoryArray(categories) {
  if (!categories) {
    throw createArgumentError("categories");
  }

  if (!Array.isArray(categories)) {
    throw createArgumentTypeError("categories", typeof categories, typeof Array);
  }

  if (categories.length === 0) {
    throw createArgumentError("categories");
  }

  categories.forEach(validateCategory);
}

function validateCategory(category) {
  if (!category) {
    throw createArgumentError("categories");
  }

  if (typeof category !== "string") {
    throw createArgumentTypeError("categories", typeof category, "string");
  }

  if (category.length > categoriesCharacterLimit) {
    throw createArgumentOutOfRange("categories", category.length);
  }
}
// CONCATENATED MODULE: ./src/methods/removeMasterCategories.ts




function removeMasterCategories(categories) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(3
  /* readWriteMailbox */
  , "masterCategories.removeAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    categories: categories
  };
  validateCategoryArray(categories);
  standardInvokeHostMethod(162
  /* removeMasterCategories */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/api/getMasterCategoriesSurface.ts




function getMasterCategoriesSurface() {
  return objectDefine({}, {
    addAsync: addMasterCategories,
    getAsync: getMasterCategories,
    removeAsync: removeMasterCategories
  });
}
// CONCATENATED MODULE: ./src/methods/closeApp.ts

function closeApp() {
  standardInvokeHostMethod(42
  /* closeApp */
  , undefined, undefined, undefined, undefined);
}
// CONCATENATED MODULE: ./src/utils/getHostItemType.ts

var getHostItemType_getHostItemType = function getHostItemType() {
  return getInitialDataProp("itemType");
};
// CONCATENATED MODULE: ./src/utils/HostItemType.ts
var HostItemType;

(function (HostItemType) {
  HostItemType[HostItemType["Message"] = 1] = "Message";
  HostItemType[HostItemType["Appointment"] = 2] = "Appointment";
  HostItemType[HostItemType["MeetingRequest"] = 3] = "MeetingRequest";
  HostItemType[HostItemType["MessageCompose"] = 4] = "MessageCompose";
  HostItemType[HostItemType["AppointmentCompose"] = 5] = "AppointmentCompose";
  HostItemType[HostItemType["ItemLess"] = 6] = "ItemLess";
})(HostItemType || (HostItemType = {}));
// CONCATENATED MODULE: ./src/methods/getInitializationContext.ts



function getInitializationContext() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getInitializationContext");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(99
  /* getInitializationContext */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/validation/customPropertiesConstants.ts
var DatePrefix = "Date(";
var DatePostfix = ")";
var MaxCustomPropertiesLength = 2500;
var CustomPropertyType;

(function (CustomPropertyType) {
  CustomPropertyType[CustomPropertyType["NonTransmittable"] = 0] = "NonTransmittable";
})(CustomPropertyType || (CustomPropertyType = {}));
// CONCATENATED MODULE: ./src/methods/saveCustomProperties.ts





function saveCustomProperties(customProperties) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.saveCustomProperties");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , true
  /* tryLegacy */
  );
  saveCustomProperties_validateParameters(customProperties);
  standardInvokeHostMethod(4
  /* saveCustomProperties */
  , commonParameters.asyncContext, commonParameters.callback, {
    customProperties: customProperties
  }, undefined);
}

function saveCustomProperties_validateParameters(customProperties) {
  if (JSON.stringify(customProperties).length > MaxCustomPropertiesLength) {
    throw createArgumentOutOfRange("customProperties");
  }
}
// CONCATENATED MODULE: ./src/api/CustomProperties.ts
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};






var CustomProperties_CustomProperties =
/** @class */
function () {
  function CustomProperties(deserializedData) {
    if (isNullOrUndefined(deserializedData)) {
      createNullArgumentError("data");
    } // If responseData is an array, it means we have non-transmittable, transmittable, and other properties.
    // For exchange 15 SP1, only non-transmittable is supported.


    if (deserializedData instanceof Array) {
      var customropertiesArray = deserializedData;

      if (customropertiesArray.length > CustomPropertyType.NonTransmittable) {
        deserializedData = customropertiesArray[CustomPropertyType.NonTransmittable];
      } else {
        throw createArgumentError("data");
      }
    } else {
      this.rawData = deserializedData;
    }
  }

  CustomProperties.prototype.get = function (key) {
    var value = this.rawData[key];

    if (typeof value === "string") {
      var valueString = value;

      if (valueString.length > DatePrefix.length + DatePostfix.length && valueString.startsWith(DatePrefix) && valueString.endsWith(DatePostfix)) {
        var ticksString = valueString.substring(DatePrefix.length, valueString.length - 1);
        var ticks = parseInt(ticksString);

        if (!isNaN(ticks)) {
          var dateTimeValue = new Date(ticks);

          if (!isNullOrUndefined(dateTimeValue)) {
            value = dateTimeValue;
          }
        }
      }
    }

    return value;
  };

  CustomProperties.prototype.set = function (key, value) {
    if (value instanceof Date) {
      value = DatePrefix + value.getTime() + DatePostfix;
    }

    this.rawData[key] = value;
  };

  CustomProperties.prototype.remove = function (key) {
    delete this.rawData[key];
  };

  CustomProperties.prototype.saveAsync = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    saveCustomProperties.apply(void 0, __spreadArrays([this.rawData], args));
  };

  return CustomProperties;
}();


// CONCATENATED MODULE: ./src/methods/loadCustomProperties.ts






var loadCustomProperties_OSF = __webpack_require__(1);

function loadCustomProperties() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , true
  /* tryLegacy */
  );
  standardInvokeHostMethod(3
  /* loadCustomProperties */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined, loadCustomProperties_handleCustomResponse);
}

function loadCustomProperties_handleCustomResponse(data, context, responseCode) {
  if (typeof responseCode !== "undefined" && responseCode !== InvokeResultCode.noError) {
    return createAsyncResult(undefined, loadCustomProperties_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9017
    /* AccessRestricted */
    , context, Object(ExtensibilityStrings["a" /* getString */])("l_InternalProtocolError_Text").replace("{0}", responseCode));
  } else if (data.wasSuccessful) {
    var props = JSON.parse(data.customProperties);
    var value = new CustomProperties_CustomProperties(props);
    return createAsyncResult(value, loadCustomProperties_OSF.DDA.AsyncResultEnum.ErrorCode.Success, 0, context);
  } else {
    return createAsyncResult(undefined, loadCustomProperties_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9020
    /* GenericResponseError */
    , context, data.errorMessage);
  }
}
// CONCATENATED MODULE: ./src/utils/bodyUtils.ts



var bodyUtils_OSF = __webpack_require__(1);

var HostCoercionType;

(function (HostCoercionType) {
  HostCoercionType[HostCoercionType["Text"] = 0] = "Text";
  HostCoercionType[HostCoercionType["Html"] = 3] = "Html";
})(HostCoercionType || (HostCoercionType = {}));

function addCoercionTypeParameter(parameters, args) {
  if (!!args.options && typeof args.options.coercionType === "string") {
    parameters.coercionType = getCoercionTypeFromString(args.options.coercionType);
  } else {
    parameters.coercionType = HostCoercionType.Text;
  }
}
function getCoercionTypeFromString(coercionType) {
  if (coercionType === CoercionType.Html) {
    return HostCoercionType.Html;
  } else if (coercionType === CoercionType.Text) {
    return HostCoercionType.Text;
  } else {
    return undefined;
  }
}
function invokeCallbackWithCoercionTypeError(args) {
  args.callback && args.callback(createAsyncResult(undefined, bodyUtils_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 1000
  /* OoeCoercionTypeNotSupported */
  , args.asyncContext));
}
// CONCATENATED MODULE: ./src/methods/getBody.ts





function getBody(coercionType) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "body.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    coercionType: getCoercionTypeFromString(coercionType)
  };

  if (parameters.coercionType === undefined) {
    throw createArgumentError("coercionType");
  }

  standardInvokeHostMethod(37
  /* getBody */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/getBodyType.ts



function getBodyType() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "body.getTypeAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(14
  /* getBodyType */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/validation/validateBodyParameters.ts

var maxDataLengthForBodyApi = 1000000;
function validateBodyParameters(parameters) {
  if (typeof parameters.data !== "string") {
    throw createArgumentTypeError("data", typeof parameters.data, "string");
  }

  if (parameters.data.length > maxDataLengthForBodyApi) {
    throw createArgumentOutOfRange("data", parameters.data.length);
  }
}
// CONCATENATED MODULE: ./src/methods/setBody.ts





function setBody(data) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "body.setAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    data: data
  };
  validateBodyParameters(parameters);
  addCoercionTypeParameter(parameters, commonParameters);

  if (parameters.coercionType === undefined) {
    invokeCallbackWithCoercionTypeError(commonParameters);
    return;
  }

  standardInvokeHostMethod(38
  /* setBody */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/bodyPrepend.ts





function bodyPrepend(data) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "body.prependAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    data: data
  };
  validateBodyParameters(parameters);
  addCoercionTypeParameter(parameters, commonParameters);

  if (parameters.coercionType === undefined) {
    invokeCallbackWithCoercionTypeError(commonParameters);
    return;
  }

  standardInvokeHostMethod(23
  /* bodyPrepend */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/appendOnSend.ts






var maxAppendOnSendLength = 5000;
function appendOnSend(data) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "body.appendOnSendAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    data: data
  };
  validateBodyParameters(parameters);

  if (parameters.data && parameters.data.length > maxAppendOnSendLength) {
    throw createArgumentOutOfRange("data", data.length);
  }

  addCoercionTypeParameter(parameters, commonParameters);

  if (parameters.coercionType === undefined) {
    invokeCallbackWithCoercionTypeError(commonParameters);
    return;
  }

  standardInvokeHostMethod(100
  /* appendOnSend */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/setSelectedData.ts





function setSelectedData(dispid) {
  return function (data) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    checkPermissionsAndThrow(2
    /* readWriteItem */
    , "body.setSelectedDataAsync");
    var commonParameters = parseCommonArgs(args, false
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    var parameters = {
      data: data
    };
    validateBodyParameters(parameters);
    addCoercionTypeParameter(parameters, commonParameters);

    if (parameters.coercionType === undefined) {
      invokeCallbackWithCoercionTypeError(commonParameters);
      return;
    }

    standardInvokeHostMethod(dispid, commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
  };
}
// CONCATENATED MODULE: ./src/api/getBodySurface.ts







function getBodySurface(isCompose) {
  var body = objectDefine({}, {
    getAsync: getBody
  });

  if (isCompose) {
    objectDefine(body, {
      appendOnSendAsync: appendOnSend,
      getTypeAsync: getBodyType,
      prependAsync: bodyPrepend,
      setAsync: setBody,
      setSelectedDataAsync: setSelectedData(13
      /* bodySetSelectedData */
      )
    });
  }

  return body;
}
// CONCATENATED MODULE: ./src/utils/validateString.ts


function validateStringParam(paramName, paramValue) {
  if (isNullOrUndefined(paramValue) || paramValue === "") {
    throw createNullArgumentError(paramName);
  }

  if (!(typeof paramValue === "string")) {
    throw createArgumentTypeError(paramName, typeof paramValue, "string");
  }
}
// CONCATENATED MODULE: ./src/validation/validateInternetHeaders.ts



function validateInternetHeaderArray(internetHeaderArray) {
  if (isNullOrUndefined(internetHeaderArray)) {
    throw createArgumentError("internetHeaders");
  }

  if (!(internetHeaderArray instanceof Array)) {
    throw createArgumentTypeError("internetHeaders", typeof internetHeaderArray, "Array");
  }

  if (internetHeaderArray.length === 0) {
    throw createArgumentError("internetHeaders");
  } //Check if each entry is a string and not empty


  for (var _i = 0, internetHeaderArray_1 = internetHeaderArray; _i < internetHeaderArray_1.length; _i++) {
    var internetHeader = internetHeaderArray_1[_i];
    validateStringParam("internetHeaders", internetHeader);
  }
}
// CONCATENATED MODULE: ./src/methods/removeInternetHeaders.ts




function removeInternetHeaders(internetHeaderKeys) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "internetHeaders.removeAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    internetHeaderKeys: internetHeaderKeys
  };
  removeInternetHeaders_validateParameters(parameters);
  standardInvokeHostMethod(153
  /* removeInternetHeaders */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function removeInternetHeaders_validateParameters(parameters) {
  validateInternetHeaderArray(parameters.internetHeaderKeys);
}
// CONCATENATED MODULE: ./src/methods/getInternetHeaders.ts




function getInternetHeaders(internetHeaderKeys) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "internetHeaders.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    internetHeaderKeys: internetHeaderKeys
  };
  getInternetHeaders_validateParameters(parameters);
  standardInvokeHostMethod(151
  /* getInternetHeaders */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function getInternetHeaders_validateParameters(parameters) {
  validateInternetHeaderArray(parameters.internetHeaderKeys);
}
// CONCATENATED MODULE: ./src/methods/setInternetHeaders.ts







var InternetHeadersLimit = 998;
function setInternetHeaders(internetHeaderNameValuePairs) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "internetHeaders.setAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    internetHeaderNameValuePairs: internetHeaderNameValuePairs
  };
  setInternetHeaders_validateParameters(parameters);
  standardInvokeHostMethod(152
  /* setInternetHeaders */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function setInternetHeaders_validateParameters(parameters) {
  if (isNullOrUndefined(parameters.internetHeaderNameValuePairs)) {
    throw createNullArgumentError("internetHeaders");
  } // Convert to array [[key, value]...]


  var entries = Object.entries(parameters.internetHeaderNameValuePairs);

  if (entries.length === 0) {
    throw createArgumentError("internetHeaders");
  }

  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var entry = entries_1[_i];
    var key = entry[0];
    var value = entry[1];
    validateStringParam("internetHeaders", key);

    if (!(typeof value === "string")) {
      throw createArgumentTypeError("internetHeaders", typeof value, "string");
    }

    throwOnOutOfRange(key.length + value.length, 0, InternetHeadersLimit, key);
  }
}
// CONCATENATED MODULE: ./src/api/getInternetHeadersSurface.ts




function getInternetHeadersSurface(isCompose) {
  var internetHeaders = objectDefine({}, {
    getAsync: getInternetHeaders
  });

  if (isCompose) {
    objectDefine(internetHeaders, {
      removeAsync: removeInternetHeaders,
      setAsync: setInternetHeaders
    });
  }

  return internetHeaders;
}
// CONCATENATED MODULE: ./src/types/ItemNotificationMessageType.ts
// this matches the HostItemNotificationMessageType definition in the API
var ItemNotificationMessageType;

(function (ItemNotificationMessageType) {
  ItemNotificationMessageType[ItemNotificationMessageType["informationalMessage"] = 0] = "informationalMessage";
  ItemNotificationMessageType[ItemNotificationMessageType["progressIndicator"] = 1] = "progressIndicator";
  ItemNotificationMessageType[ItemNotificationMessageType["errorMessage"] = 2] = "errorMessage";
  ItemNotificationMessageType[ItemNotificationMessageType["insightMessage"] = 3] = "insightMessage";
})(ItemNotificationMessageType || (ItemNotificationMessageType = {}));
// CONCATENATED MODULE: ./src/validation/notificationMessagesConstants.ts
var MaximumKeyLength = 32;
var MaximumIconLength = 32;
var MaximumMessageLength = 150;
var MaximumActionTextLength = 30;
var NotificationsKeyParameterName = "key";
var NotificationsTypeParameterName = "type";
var NotificationsIconParameterName = "icon";
var NotificationsMessageParameterName = "message";
var NotificationsPersistentParameterName = "persistent";
var NotificationsActionsDefinitionParameterName = "actions";
var NotificationsActionTypeParameterName = "actionType";
var NotificationsActionTextParameterName = "actionText";
var NotificationsActionCommandIdParameterName = "commandId";
var NotificationsActionShowTaskPaneActionId = "showTaskPane";
// CONCATENATED MODULE: ./src/validation/validateNotificationMessages.ts





 // Validate the notifications key

function validateKey(key) {
  validateStringParam(NotificationsKeyParameterName, key);

  if (key.length > MaximumKeyLength) {
    throw createArgumentOutOfRange(NotificationsKeyParameterName, key.length);
  }
} // Validate the NotificationMessageDetails data

function validateData(data) {
  // Notification type must a string
  validateStringParam(NotificationsTypeParameterName, data.type); // If the notification type is informational, the icon and persistent parameters are required

  if (data.type === MailboxEnums.ItemNotificationMessageType.InformationalMessage) {
    // icon must be a string and have a maximum length
    validateStringParam(NotificationsIconParameterName, data.icon);

    if (data.icon.length > MaximumIconLength) {
      throw createArgumentOutOfRange(NotificationsIconParameterName, data.icon.length);
    } // persistent must be defined and a boolean


    if (isNullOrUndefined(data.persistent)) {
      throw createNullArgumentError(NotificationsPersistentParameterName);
    }

    if (typeof data.persistent !== "boolean") {
      throw createArgumentTypeError(NotificationsPersistentParameterName, typeof data.persistent, "boolean");
    } // actions cannot be defined on non insight types


    if (!isNullOrUndefined(data.actions)) {
      throw createArgumentError(NotificationsActionsDefinitionParameterName, Object(ExtensibilityStrings["a" /* getString */])("l_ActionsDefinitionWrongNotificationMessageError_Text"));
    }
  } // Notification type is Insight
  else if (data.type === MailboxEnums.ItemNotificationMessageType.InsightMessage) {
      // Icon should be a string and has a maximum length
      validateStringParam(NotificationsIconParameterName, data.icon);

      if (data.icon.length > MaximumIconLength) {
        throw createArgumentOutOfRange(NotificationsIconParameterName, data.icon.length);
      }

      if (!isNullOrUndefined(data.persistent)) {
        throw createNullArgumentError(NotificationsPersistentParameterName);
      }

      if (!isNullOrUndefined(data.actions)) {
        validateActionsDefinitionBlob(data.actions);
      }
    } // All other notification types must NOT have icon and persistent parameters
    else {
        if (!isNullOrUndefined(data.icon)) {
          throw createArgumentError(NotificationsIconParameterName);
        }

        if (!isNullOrUndefined(data.persistent)) {
          throw createArgumentError(NotificationsPersistentParameterName);
        } // Actions cannot be defined


        if (!isNullOrUndefined(data.actions)) {
          throw createArgumentError(NotificationsActionsDefinitionParameterName, Object(ExtensibilityStrings["a" /* getString */])("l_ActionsDefinitionWrongNotificationMessageError_Text"));
        }
      } // Message should be a string and have a maximum length


  validateStringParam(NotificationsMessageParameterName, data.message);

  if (data.message.length > MaximumMessageLength) {
    throw createArgumentOutOfRange(NotificationsMessageParameterName, data.message.length);
  }
}

function validateActionsDefinitionBlob(actionsDefinitionBlob) {
  var actionsDefinition = extractActionsDefinition(actionsDefinitionBlob);

  if (isNullOrUndefined(actionsDefinition)) {
    return;
  }

  validateActionsDefinitionActionsType(actionsDefinition);
  validateActionsDefinitionActionsText(actionsDefinition);
}

function extractActionsDefinition(actionsDefinitionBlob) {
  var actionsDefinition = null;

  if (actionsDefinitionBlob instanceof Array) {
    if (actionsDefinitionBlob.length === 1) {
      actionsDefinition = actionsDefinitionBlob[0];
    } else if (actionsDefinitionBlob.length > 1) {
      throw createArgumentError(NotificationsActionsDefinitionParameterName, Object(ExtensibilityStrings["a" /* getString */])("l_ActionsDefinitionMultipleActionsError_Text"));
    }
  } else {
    throw createArgumentError(NotificationsActionsDefinitionParameterName);
  }

  return actionsDefinition;
}

function validateActionsDefinitionActionsType(actionsDefinition) {
  if (isNullOrUndefined(actionsDefinition.actionType)) {
    throw createNullArgumentError(NotificationsActionTypeParameterName);
  }

  if (NotificationsActionShowTaskPaneActionId !== actionsDefinition.actionType) {
    throw createArgumentError(NotificationsActionTypeParameterName, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidActionType_Text"));
  } else {
    // In the case that showTaskPane had been configured, the commandId parameter must also be defined
    if (isNullOrUndefined(actionsDefinition.commandId) || typeof actionsDefinition.commandId !== "string" || actionsDefinition.commandId === "") {
      throw createArgumentError(NotificationsActionCommandIdParameterName, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidCommandIdError_Text"));
    }
  }
}

function validateActionsDefinitionActionsText(actionsDefinition) {
  if (isNullOrUndefined(actionsDefinition.actionText) || actionsDefinition.actionText === "" || typeof actionsDefinition.actionText !== "string") {
    throw createNullArgumentError(NotificationsActionTextParameterName);
  }

  if (actionsDefinition.actionText.length > MaximumActionTextLength) {
    throw createArgumentOutOfRange(NotificationsActionTextParameterName, actionsDefinition.actionText.length);
  }
}
// CONCATENATED MODULE: ./src/methods/addNotificationMessage.ts







function addNotificationMessage(key, data) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "notificationMessages.addAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  ); // validate parameters

  validateKey(key);
  validateData(data); // convert notification type value to the host enum value

  var type = ItemNotificationMessageType[data.type];

  if (isNullOrUndefined(type)) {
    throw createArgumentError("type");
  }

  var message = data.message; // these parameters may be undefined and it is ok to pass them as undefined

  var icon = data.icon;
  var persistent = data.persistent;
  var actions = data.actions;
  var parameters = {
    key: key,
    message: message,
    type: type,
    icon: icon,
    persistent: persistent,
    actions: actions
  };
  standardInvokeHostMethod(33
  /* addNotificationMessage */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/getAllNotificationMessages.ts



function getAllNotificationMessages() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "notificationMessages.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(34
  /* getAllNotificationMessages */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/removeNotificationMessage.ts




function removeNotificationMessage(key) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "notificationMessages.removeAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  validateKey(key);
  var parameters = {
    key: key
  };
  standardInvokeHostMethod(36
  /* removeNotificationMessage */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/replaceNotificationMessage.ts







function replaceNotificationMessage(key, data) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "notificationMessages.replaceAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  ); // validate parameters

  validateKey(key);
  validateData(data); // convert notification type value to the host enum value

  var type = ItemNotificationMessageType[data.type];

  if (isNullOrUndefined(type)) {
    throw createArgumentError("type");
  }

  var message = data.message; // these parameters may be undefined and it is ok to pass them as undefined

  var icon = data.icon;
  var persistent = data.persistent;
  var actions = data.actions;
  var parameters = {
    key: key,
    message: message,
    type: type,
    icon: icon,
    persistent: persistent,
    actions: actions
  };
  standardInvokeHostMethod(35
  /* replaceNotificationMessage */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/api/getNotificationMessagesSurface.ts





function getNotificationMessageSurface() {
  return objectDefine({}, {
    addAsync: addNotificationMessage,
    getAllAsync: getAllNotificationMessages,
    removeAsync: removeNotificationMessage,
    replaceAsync: replaceNotificationMessage
  });
}
// CONCATENATED MODULE: ./src/validation/validateDisplayReplyForm.ts





function validateStringParameters(formData) {
  if (!isNullOrUndefined(formData)) {
    throwOnOutOfRange(formData.length, 0, maxBodyLength, "htmlBody");
  }
}
function validateAndGetHtmlBody(data) {
  var htmlBody = "";

  if (data.htmlBody) {
    throwOnInvalidHtmlBody(data.htmlBody);
    htmlBody = data.htmlBody;
  }

  return htmlBody;
}
function throwOnInvalidHtmlBody(htmlBody) {
  if (!(typeof htmlBody === "string")) {
    throw createArgumentTypeError("htmlBody", typeof htmlBody, "string");
  }

  if (isNullOrUndefined(htmlBody)) {
    throw createNullArgumentError("htmlBody");
  }

  throwOnOutOfRange(htmlBody.length, 0, maxBodyLength, "htmlBody");
}
function validateAndGetAttachments(data) {
  var attachments = [];

  if (data.attachments) {
    attachments = data.attachments;
    throwOnInvalidAttachmentsArray(attachments);
  }

  return attachments;
}
// CONCATENATED MODULE: ./src/methods/displayReplyForm.ts






function displayReplyForm(formData) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayReplyForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    formData: formData
  };
  var updatedHtmlBody = null;
  var updateAttachments = null;

  if (typeof parameters.formData === "string") {
    validateStringParameters(parameters.formData);
    standardInvokeHostMethod(10
    /* displayReplyForm */
    , commonParameters.asyncContext, commonParameters.callback, {
      htmlBody: parameters.formData
    }, undefined);
  } else if (typeof parameters.formData === "object") {
    updatedHtmlBody = validateAndGetHtmlBody(parameters.formData);
    updateAttachments = createAttachmentsDataForHost(validateAndGetAttachments(parameters.formData)); //displayReplyFormWithAttachments

    standardInvokeHostMethod(30
    /* displayReplyFormWithAttachments */
    , commonParameters.asyncContext, commonParameters.callback, {
      htmlBody: updatedHtmlBody,
      attachments: updateAttachments
    }, undefined);
  } else {
    throw createArgumentError();
  }
}
// CONCATENATED MODULE: ./src/methods/displayReplyAllForm.ts






function displayReplyAllForm(formData) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "mailbox.displayReplyAllForm");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    formData: formData
  };
  var updatedHtmlBody = null;
  var updateAttachments = null;

  if (typeof parameters.formData === "string") {
    validateStringParameters(parameters.formData);
    standardInvokeHostMethod(11
    /* displayReplyAllForm */
    , commonParameters.asyncContext, commonParameters.callback, {
      htmlBody: parameters.formData
    }, undefined);
  } else if (typeof parameters.formData === "object") {
    updatedHtmlBody = validateAndGetHtmlBody(parameters.formData);
    updateAttachments = createAttachmentsDataForHost(validateAndGetAttachments(parameters.formData)); //displayReplyAllFormWithAttachments

    standardInvokeHostMethod(31
    /* displayReplyAllFormWithAttachments */
    , commonParameters.asyncContext, commonParameters.callback, {
      htmlBody: updatedHtmlBody,
      attachments: updateAttachments
    }, undefined);
  } else {
    throw createArgumentError();
  }
}
// CONCATENATED MODULE: ./src/methods/addCategories.ts




function addCategories(categories) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "categories.addAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    categories: categories
  };
  validateCategoryArray(categories);
  standardInvokeHostMethod(158
  /* addCategories */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/methods/getCategories.ts



function getCategories() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "categories.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(157
  /* getCategories */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/removeCategories.ts




function removeCategories(categories) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "categories.removeAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    categories: categories
  };
  validateCategoryArray(categories);
  standardInvokeHostMethod(159
  /* removeCategories */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}
// CONCATENATED MODULE: ./src/api/getCategoriesSurface.ts




function getCategoriesSurface() {
  return objectDefine({}, {
    addAsync: addCategories,
    getAsync: getCategories,
    removeAsync: removeCategories
  });
}
// CONCATENATED MODULE: ./src/methods/getAttachmentContent.ts




function getAttachmentContent(id) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getAttachmentContentAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    id: id
  };
  getAttachmentContent_validateParameters(parameters);
  standardInvokeHostMethod(150
  /* getAttachmentContent */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function getAttachmentContent_validateParameters(parameters) {
  validateStringParam("attachmentId", parameters.id);
}
// CONCATENATED MODULE: ./src/methods/moveToFolder.ts





var Folder = MailboxEnums.Folder;
function moveToFolder(destinationFolder) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(3
  /* readWriteMailbox */
  , "item.move");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    destinationFolder: destinationFolder
  };
  moveToFolder_validateParameters(destinationFolder);
  standardInvokeHostMethod(101
  /* moveToFolder */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function moveToFolder_validateParameters(destinationFolder) {
  if (destinationFolder !== Folder.Inbox && destinationFolder !== Folder.Junk && destinationFolder !== Folder.DeletedItems) {
    throw createArgumentError("destinationFolder");
  }
}
// CONCATENATED MODULE: ./src/utils/createEmailAddressDetails.ts

var ResponseType = MailboxEnums.ResponseType;
var RecipientType = MailboxEnums.RecipientType;
var responseTypeMap = [ResponseType.None, ResponseType.Organizer, ResponseType.Tentative, ResponseType.Accepted, ResponseType.Declined];
var recipientTypeMap = [RecipientType.Other, RecipientType.DistributionList, RecipientType.User, RecipientType.ExternalUser];
var createEmailAddressDetails = function createEmailAddressDetails(input) {
  var response = input.appointmentResponse;
  var type = input.recipientType;
  var emailAddressDetails = {
    emailAddress: input.address,
    displayName: input.name
  };

  if (typeof input.appointmentResponse === "number") {
    emailAddressDetails.appointmentResponse = response < responseTypeMap.length ? responseTypeMap[response] : ResponseType.None;
  }

  if (typeof input.recipientType === "number") {
    emailAddressDetails.recipientType = type < recipientTypeMap.length ? recipientTypeMap[response] : RecipientType.Other;
  }

  return emailAddressDetails;
};
function createEmailAddressDetailsForEntity(data) {
  return createEmailAddressDetails({
    name: data.Name || "",
    address: data.UserId || ""
  });
}
// CONCATENATED MODULE: ./src/methods/getDelayDelivery.ts



function getDelayDelivery() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "delayDeliveryTime.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(166
  /* getDelayDeliveryTime */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/setDelayDelivery.ts






function setDelayDelivery(dateTime) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "delayDeliveryTime.setAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  validateParamerters(dateTime);
  standardInvokeHostMethod(167
  /* setDelayDeliveryTime */
  , commonParameters.asyncContext, commonParameters.callback, {
    time: dateTime.getTime()
  }, undefined);
}

function validateParamerters(dateTime) {
  if (isNullOrUndefined(dateTime)) {
    throw createNullArgumentError("dateTime", "You cannot conduct to a null dateTime");
  }

  if (!(dateTime instanceof Date)) {
    throw createArgumentTypeError("dateTime", typeof dateTime, typeof Date);
  }

  if (isNaN(dateTime.getTime())) {
    throw createArgumentError("dateTime");
  } // The actual range of times supported by ECMAScript Date objects is exactly
  // –100,000,000 days to 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC.
  // This gives a range of 8,640,000,000,000,000 milliseconds to either side of 01 January, 1970 UTC.
  // So -8640000000000001 and 8640000000000001 would be invalid date.


  throwOnOutOfRange(dateTime.getTime(), -8640000000000000, 8640000000000000, "dateTime");
}
// CONCATENATED MODULE: ./src/api/getDelayDeliverySurface.ts



function getDelayDeliverySurface(isCompose) {
  var delayDelivery = objectDefine({}, {
    getAsync: getDelayDelivery
  });

  if (isCompose) {
    objectDefine(delayDelivery, {
      setAsync: setDelayDelivery
    });
  }

  return delayDelivery;
}
// CONCATENATED MODULE: ./src/utils/removeDuplicates.ts
function removeDuplicates(array, comparator) {
  for (var matchIndex1 = array.length - 1; matchIndex1 >= 0; matchIndex1--) {
    var removeMatch = false;

    for (var matchIndex2 = matchIndex1 - 1; matchIndex2 >= 0; matchIndex2--) {
      if (comparator(array[matchIndex1], array[matchIndex2])) {
        removeMatch = true;
        break;
      }
    }

    if (removeMatch) {
      array.splice(matchIndex1, 1);
    }
  }

  return array;
}
var stringComparator = function stringComparator(a, b) {
  return a === b;
};
var meetingComparator = function meetingComparator(a, b) {
  if (a === b) {
    return true;
  } else if (!a || !b) {
    return false;
  } else {
    return a.meetingString === b.meetingString;
  }
};
var taskComparator = function taskComparator(a, b) {
  if (a === b) {
    return true;
  } else if (!a || !b) {
    return false;
  } else {
    return a.taskString === b.taskString;
  }
};
var contactComparator = function contactComparator(a, b) {
  if (a === b) {
    return true;
  } else if (!a || !b) {
    return false;
  } else {
    return a.contactString === b.contactString;
  }
};
// CONCATENATED MODULE: ./src/utils/isLegacyEntityExtraction.ts

function isLegacyEntityExtraction() {
  return !!getInitialDataProp("entities") && getInitialDataProp("entities").IsLegacyExtraction !== undefined && getInitialDataProp("entities").IsLegacyExtraction;
}
// CONCATENATED MODULE: ./src/utils/resolveDate.ts


var totalBits = 18;
var typeBits = 3;
var preciseDateTypeBits = 3;
var yearBits = 7;
var monthBits = 4;
var dayBits = 5;
var modifierBits = 2;
var unitBits = 3;
var offsetBits = 6;
var tagBits = 4;
var preciseDateType = 0;
var relativeDateType = 1;
var oneDayInMilliseconds = 86400000;
var baseDate = new Date("0001-01-01T00:00:00Z");
function resolveDate(input, sentTime) {
  if (!sentTime) {
    return input;
  }

  var date = null;

  try {
    var sentDate = new Date(sentTime.getFullYear(), sentTime.getMonth(), sentTime.getDate(), 0, 0, 0, 0);
    var extractedDate = decode(input);

    if (!extractedDate) {
      return input;
    } else {
      var preciseDate = extractedDate;

      if (preciseDate.day && preciseDate.month && preciseDate.year !== undefined) {
        date = resolvePreciseDate(sentDate, extractedDate);
      } else {
        var relativeDate = extractedDate;

        if (relativeDate.modifier !== undefined && relativeDate.offset !== undefined && relativeDate.tag !== undefined && relativeDate.unit !== undefined) {
          date = resolveRelativeDate(sentDate, extractedDate);
        } else {
          date = sentDate;
        }
      }
    }

    if (Number.isNaN(date.getTime())) {
      return sentTime;
    }

    date.setMilliseconds(date.getMilliseconds() + (isLegacyEntityExtraction() ? getTimeOfDayInMillisecondsUTC(input) : getTimeOfDayInMilliseconds(input)));
    return date;
  } catch (e) {
    return sentTime;
  }
}

function decode(input) {
  var dateValueMask = (1 << totalBits - typeBits) - 1;
  var time = 0;

  if (input == null) {
    return undefined;
  }

  if (isLegacyEntityExtraction()) {
    time = getTimeOfDayInMillisecondsUTC(input);
  } else {
    time = getTimeOfDayInMilliseconds(input);
  }

  var inDateAtMidnight = input.getTime() - time;
  var value = (inDateAtMidnight - baseDate.getTime()) / oneDayInMilliseconds;

  if (value < 0) {
    return undefined;
  } else if (value >= 1 << totalBits) {
    return undefined;
  } else {
    var type = value >> totalBits - typeBits;
    value = value & dateValueMask;

    switch (type) {
      case preciseDateType:
        return decodePreciseDate(value);

      case relativeDateType:
        return decodeRelativeDate(value);

      default:
        return undefined;
    }
  }
}

function decodePreciseDate(value) {
  var cSubTypeMask = (1 << preciseDateTypeBits) - 1;
  var cMonthMask = (1 << monthBits) - 1;
  var cDayMask = (1 << dayBits) - 1;
  var cYearMask = (1 << yearBits) - 1;
  var year = 0;
  var month = 0;
  var day = 0;
  var subType = value >> totalBits - typeBits - preciseDateTypeBits & cSubTypeMask;

  if ((subType & 4) == 4) {
    // year is present, get the year bits
    year = value >> totalBits - typeBits - preciseDateTypeBits - yearBits & cYearMask;

    if ((subType & 2) == 2) {
      if ((subType & 1) == 1) {
        // unsupported
        return undefined;
      } // month is present, get month


      month = value >> totalBits - typeBits - preciseDateTypeBits - yearBits - monthBits & cMonthMask;
    }
  } // year is not present
  else {
      if ((subType & 2) == 2) {
        // month is present, get month
        month = value >> totalBits - typeBits - preciseDateTypeBits - monthBits & cMonthMask;
      }

      if ((subType & 1) == 1) {
        // day is present, get day
        day = value >> totalBits - typeBits - preciseDateTypeBits - monthBits - dayBits & cDayMask;
      }
    }

  return createPreciseDate(day, month, year);
}

function resolvePreciseDate(sentDate, precise) {
  var year = precise.year;
  var month = precise.month == 0 ? sentDate.getMonth() : precise.month - 1;
  var day = precise.day;

  if (day == 0) {
    return sentDate;
  }

  var candidate;

  if (isNullOrUndefined(year)) {
    // year is missing, use the current year if the date is greater
    // than or equal to the sent date, otherwise use the next year
    candidate = new Date(sentDate.getFullYear(), month, day);

    if (candidate.getTime() < sentDate.getTime()) {
      candidate = new Date(sentDate.getFullYear() + 1, month, day);
    }
  } else {
    candidate = new Date(year < 50 ? 2000 + year : 1900 + year, month, day);
  } // This is to handle the case where we have an invalid date - ie Feb 30th


  if (candidate.getMonth() != month) {
    return sentDate;
  }

  return candidate;
}

function resolveRelativeDate(sentDate, relative) {
  var date;

  switch (relative.unit) {
    case 0
    /* Day */
    :
      date = new Date(sentDate.getFullYear(), sentDate.getMonth(), sentDate.getDate());
      date.setDate(date.getDate() + relative.offset);
      return date;

    case 5
    /* DayOfWeek */
    :
      return findBestDateForWeekDate(sentDate, relative.offset, relative.tag);

    case 2
    /* Month */
    :
      {
        var days = 1; // If the modifier is 'early' then select the 1st day of
        // the month; If 'late' then select the 16th
        // otherwise; If 'undefined' then select the current day
        // or 1 depending on the offset

        switch (relative.modifier) {
          case 1
          /* Early */
          :
            break;

          case 2
          /* Late */
          :
            days = 16;
            break;

          default:
            if (relative.offset == 0) {
              days = sentDate.getDate();
            }

            break;
        } // construct the return date object


        date = new Date(sentDate.getFullYear(), sentDate.getMonth(), days);
        date.setMonth(date.getMonth() + relative.offset);

        if (date.getTime() < sentDate.getTime()) {
          date.setDate(date.getDate() + sentDate.getDate() - 1);
        }

        return date;
      }

    case 1
    /* Week */
    :
      date = new Date(sentDate.getFullYear(), sentDate.getMonth(), sentDate.getDate());
      date.setDate(sentDate.getDate() + 7 * relative.offset);

      if (relative.modifier == 1
      /* Early */
      || relative.modifier == 0
      /* Undefined */
      ) {
          // find the monday of the week
          date.setDate(date.getDate() + 1
          /* Monday */
          - date.getDay());

          if (date.getTime() < sentDate.getTime()) {
            return sentDate;
          }

          return date;
        } else if (relative.modifier == 2
      /* Late */
      ) {
          // find the closest day that is greater than the current
          // date and as close to Friday as possible
          date.setDate(date.getDate() + 5
          /* Friday */
          - date.getDay());
          return date;
        }

      break;

    case 4
    /* WeekOfMonth */
    :
      return findBestDateForWeekOfMonthDate(sentDate, relative);

    case 3
    /* Year */
    :
      if (relative.offset > 0) {
        return new Date(sentDate.getFullYear() + relative.offset, 0, 1);
      }

      break;

    default:
      break;
  }

  return sentDate;
}

function findBestDateForWeekDate(sentDate, offset, tag) {
  if (offset > -5 && offset < 5) {
    // treat sunday like 7
    var dayOfWeek = (tag + 6) % 7 + 1;
    var days = 7 * offset + (dayOfWeek - sentDate.getDay());
    sentDate.setDate(sentDate.getDate() + days);
    return sentDate;
  } else {
    // week offset is not set, find the next day of week that passes the base date
    var days = (tag - sentDate.getDay()) % 7;

    if (days < 0) {
      days += 7;
    }

    sentDate.setDate(sentDate.getDate() + days);
    return sentDate;
  }
}

function findBestDateForWeekOfMonthDate(sentDate, relative) {
  var date;
  var firstDay;
  var newDate;
  date = sentDate;

  if (relative.tag <= 0 || relative.tag > 12 || relative.offset <= 0 || relative.offset > 5) {
    // invalid date
    return sentDate;
  }

  var monthOffset = (12 + relative.tag - date.getMonth() - 1) % 12; // find the first day of month

  firstDay = new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);

  if (relative.modifier == 1
  /* Early */
  ) {
      // interpret relative dates like "n-th week of the month"
      if (relative.offset == 1 && firstDay.getDay() != 6
      /* Saturday */
      && firstDay.getDay() != 0
      /* Sunday */
      ) {
          return firstDay;
        } else {
        // otherwise, we always suggest Monday of the n-th week
        // find the  monday of the 1st week
        // could be in the previous month though
        newDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
        newDate.setDate(newDate.getDate() + (7 + (1
        /* Monday */
        - firstDay.getDay())) % 7);

        if (firstDay.getDay() != 6
        /* Saturday */
        && firstDay.getDay() != 0
        /* Sunday */
        && firstDay.getDay() != 1
        /* Monday */
        ) {
            newDate.setDate(newDate.getDate() - 7);
          } // find the n-th monday


        newDate.setDate(newDate.getDate() + 7 * (relative.offset - 1));

        if (newDate.getMonth() + 1 != relative.tag) {
          // if the n-th monday falls into the next month then ignore it
          return sentDate;
        }

        return newDate;
      }
    } else {
    // find the last day of the month
    newDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), daysInMonth(firstDay.getMonth(), firstDay.getFullYear())); // find the last Monday

    var offset = 1
    /* Monday */
    - newDate.getDay();

    if (offset > 0) {
      offset = offset - 7;
    }

    newDate.setDate(newDate.getDate() + offset); // find the last (n-th) monday

    newDate.setDate(newDate.getDate() + 7 * (1 - relative.offset));

    if (newDate.getMonth() + 1 != relative.tag) {
      // user does not specify the week correctly,
      // return the first day of the month if it
      // is not a weekend day
      if (firstDay.getDay() != 6
      /* Saturday */
      && firstDay.getDay() != 0
      /* Sunday */
      ) {
          return firstDay;
        } else {
        return sentDate;
      }
    } else {
      return newDate;
    }
  }
}

function decodeRelativeDate(value) {
  var tagMask = (1 << tagBits) - 1;
  var offsetMask = (1 << offsetBits) - 1;
  var unitMask = (1 << unitBits) - 1;
  var modifierMask = (1 << modifierBits) - 1;
  var tag = value & tagMask;
  value >>= tagBits;
  var offset = fromComplement(value & offsetMask, offsetBits);
  value >>= offsetBits;
  var unit = value & unitMask;
  value >>= unitBits;
  var modifier = value & modifierMask;

  try {
    return createRelativeDate(modifier, offset, unit, tag);
  } catch (_a) {
    return undefined;
  }
}

function fromComplement(value, n) {
  var signed = 1 << n - 1;
  var mask = (1 << n) - 1;

  if ((value & signed) == signed) {
    // negative
    return -((value ^ mask) + 1);
  } else {
    return value;
  }
}

function daysInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate();
}

function getTimeOfDayInMilliseconds(inputTime) {
  var timeOfDay = 0;
  timeOfDay += inputTime.getHours() * 3600;
  timeOfDay += inputTime.getMinutes() * 60;
  timeOfDay += inputTime.getSeconds();
  timeOfDay *= 1000;
  timeOfDay += inputTime.getMilliseconds();
  return timeOfDay;
}

function getTimeOfDayInMillisecondsUTC(inputTime) {
  var timeOfDay = 0;
  timeOfDay += inputTime.getUTCHours() * 3600;
  timeOfDay += inputTime.getUTCMinutes() * 60;
  timeOfDay += inputTime.getUTCSeconds();
  timeOfDay *= 1000;
  timeOfDay += inputTime.getUTCMilliseconds();
  return timeOfDay;
}

function createPreciseDate(day, month, year) {
  return {
    day: day,
    month: month,
    year: year % 100
  };
}

function createRelativeDate(modifier, offset, unit, tag) {
  return {
    modifier: modifier,
    offset: offset,
    unit: unit,
    tag: tag
  };
}
// CONCATENATED MODULE: ./src/utils/findOffset.ts


 // Find the offset of the time assuming the passed in OwaDateTime is in UTC

function findOffset(value) {
  // Find the appropriate time zone table
  var ranges = getInitialDataProp("timeZoneOffsets"); // Find which range the time stamp value falls within.

  for (var r = 0; r < ranges.length; r++) {
    var range = ranges[r];
    var start = parseInt(range.start);
    var end = parseInt(range.end);

    if (value.getTime() - start >= 0 && value.getTime() - end < 0) {
      return parseInt(range.offset);
    }
  }

  throw createArgumentError("input", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidDate_Text"));
}
// CONCATENATED MODULE: ./src/utils/convertToUtcClientTime.ts




function convertToUtcClientTime(input) {
  // Convert dictionary to date
  var retValue = localClientTimeToDate(input); // Check if timezone information is available, if not we can assume mailbox time is in client timezone

  if (getInitialDataProp("timeZoneOffsets") !== null) {
    var offset = findOffset(retValue);
    retValue.setUTCMinutes(retValue.getUTCMinutes() - offset);
    offset = !input["timezoneOffset"] ? retValue.getTimezoneOffset() * -1 : input["timezoneOffset"];
    retValue.setUTCMinutes(retValue.getUTCMinutes() + offset);
  }

  return retValue;
}
function localClientTimeToDate(input) {
  var retValue = new Date(input["year"], input["month"], input["date"], input["hours"], input["minutes"], input["seconds"], input["milliseconds"] === null ? 0 : input["milliseconds"]);

  if (isNaN(retValue.getTime())) {
    throw createArgumentError("input", Object(ExtensibilityStrings["a" /* getString */])("l_InvalidDate_Text"));
  }

  return retValue;
}
// CONCATENATED MODULE: ./src/utils/dateToDictionary.ts
function dateToDictionary(date) {
  return {
    month: date.getMonth(),
    date: date.getDate(),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds()
  };
}
// CONCATENATED MODULE: ./src/utils/createEntities.ts








var EntityKeys;

(function (EntityKeys) {
  EntityKeys["meetingSuggestion"] = "MeetingSuggestions";
  EntityKeys["taskSuggestion"] = "TaskSuggestions";
  EntityKeys["address"] = "Addresses";
  EntityKeys["emailAddress"] = "EmailAddresses";
  EntityKeys["url"] = "Urls";
  EntityKeys["phoneNumber"] = "PhoneNumbers";
  EntityKeys["contact"] = "Contacts";
  EntityKeys["flightReservations"] = "FlightReservations";
  EntityKeys["parcelDeliveries"] = "ParcelDeliveries";
})(EntityKeys || (EntityKeys = {}));

function createEntities(data) {
  return {
    addresses: createEntities_createAddresses(data[EntityKeys.address]),
    emailAddresses: createEntities_createEmailAddresses(data[EntityKeys.emailAddress]),
    urls: createUrls(data[EntityKeys.url]),
    taskSuggestions: createEntities_createTaskSuggestions(data[EntityKeys.taskSuggestion]),
    meetingSuggestions: createEntities_createMeetingSuggestions(data[EntityKeys.meetingSuggestion]),
    phoneNumbers: createPhoneNumbers(data[EntityKeys.phoneNumber]),
    contacts: createEntities_createContacts(data[EntityKeys.contact]),
    flightReservations: createEntities_createReadItemArray(data[EntityKeys.flightReservations]),
    parcelDelivery: createEntities_createReadItemArray(data[EntityKeys.parcelDeliveries])
  };
}
/*
data is an object where the keys are the names of entities and the values
are objects where the keys are names specified in the manifest. Example below:
{
  MeetingSuggestions: {
    tomorrow: [] // the rule is a regex rule for the string "tomorrow",
    LocationMicrosoft: [{
      // example meeting entity
    }]
  }
  ...
}
*/

function createFilteredEntities(data, name) {
  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getFilteredEntitiesByName");
  var results = Object.keys(data).map(function (entities) {
    var results = data[entities][name];
    if (results) return {
      entityType: entities,
      name: name,
      entities: data[entities][name]
    };else return undefined;
  }).filter(function (results) {
    return results !== undefined;
  });

  if (results.length === 0) {
    // We couldn't find the rule so it wasn't in the manifest
    return null;
  } // We only allow unique rule names in the manifest so if we found
  // the name, there should only be one.


  var matchedRule = results[0];

  switch (matchedRule.entityType) {
    case EntityKeys.meetingSuggestion:
      return createEntities_createMeetingSuggestions(matchedRule.entities);

    case EntityKeys.address:
      return createEntities_createAddresses(matchedRule.entities);

    case EntityKeys.contact:
      return createEntities_createContacts(matchedRule.entities);

    case EntityKeys.emailAddress:
      return createEntities_createEmailAddresses(matchedRule.entities);

    case EntityKeys.phoneNumber:
      return createPhoneNumbers(matchedRule.entities);

    case EntityKeys.taskSuggestion:
      return createEntities_createTaskSuggestions(matchedRule.entities);

    case EntityKeys.url:
      return createUrls(matchedRule.entities);

    default:
      return createEntities_createReadItemArray(matchedRule.entities);
  }
}
var createEntities_createAddresses = function createAddresses(data) {
  var addresses = data || [];
  return removeDuplicates(addresses, stringComparator);
};
var createEntities_createEmailAddresses = function createEmailAddresses(data) {
  if (getPermissionLevel_getPermissionLevel() === 0
  /* restricted */
  ) {
      return [];
    }

  return data || [];
};
var createUrls = function createUrls(data) {
  return data || [];
};
var createEntities_createTaskSuggestions = function createTaskSuggestions(data) {
  if (getPermissionLevel_getPermissionLevel() === 0
  /* restricted */
  ) {
      return [];
    }

  var tasks = data || [];
  tasks = tasks.map(function (task) {
    return {
      assignees: (task.Assignees || []).map(createEmailAddressDetailsForEntity),
      taskString: task.TaskString
    };
  });
  return removeDuplicates(tasks, taskComparator);
};
var createEntities_createMeetingSuggestions = function createMeetingSuggestions(data) {
  if (getPermissionLevel_getPermissionLevel() === 0
  /* restricted */
  ) {
      return [];
    }

  var meetings = data || [];
  meetings = meetings.map(function (meeting) {
    var start = getDate(meeting.StartTime);
    var end = getDate(meeting.EndTime);
    return {
      meetingString: meeting.MeetingString,
      attendees: (meeting.Attendees || []).map(createEmailAddressDetailsForEntity),
      location: meeting.Location,
      subject: meeting.Subject,
      start: meeting.StartTime !== undefined ? start : undefined,
      end: meeting.EndTime !== undefined ? end : undefined
    };
  });
  return removeDuplicates(meetings, meetingComparator);
};

function getDate(date) {
  var result = resolveDate(new Date(date), new Date(getInitialDataProp("dateTimeSent")));

  if (result.getTime() !== new Date(date).getTime()) {
    return convertToUtcClientTime(dateToDictionary(result));
  }

  return new Date(date);
}

var createPhoneNumbers = function createPhoneNumbers(data) {
  var phoneNumbers = data || [];
  return phoneNumbers.map(function (number) {
    return {
      phoneString: number.PhoneString,
      originalPhoneString: number.OriginalPhoneString,
      type: number.Type
    };
  });
};
var createEntities_createContacts = function createContacts(data) {
  if (getPermissionLevel_getPermissionLevel() === 0
  /* restricted */
  ) {
      return [];
    }

  var contacts = data || [];
  contacts = contacts.map(function (contact) {
    return {
      personName: contact.PersonName,
      businessName: contact.BusinessName,
      phoneNumbers: createPhoneNumbers(contact.PhoneNumbers || []),
      emailAddresses: contact.EmailAddresses || [],
      urls: contact.Urls || [],
      addresses: contact.Addresses || [],
      contactString: contact.ContactString
    };
  });
  return removeDuplicates(contacts, contactComparator);
};
var createEntities_createReadItemArray = function createReadItemArray(data) {
  if (getPermissionLevel_getPermissionLevel() === 0
  /* restricted */
  ) {
      return [];
    }

  return data || [];
};
// CONCATENATED MODULE: ./src/api/Entities.ts



var entityPermissions = {
  meetingSuggestion: 1
  /* readItem */
  ,
  taskSuggestion: 1
  /* readItem */
  ,
  address: 0
  /* restricted */
  ,
  emailAddress: 1
  /* readItem */
  ,
  url: 0
  /* restricted */
  ,
  phoneNumber: 0
  /* restricted */
  ,
  contact: 1
  /* readItem */
  ,
  flightReservations: 1
  /* readItem */
  ,
  parcelDeliveries: 1
  /* readItem */

};
var entityKeys = {
  meetingSuggestion: "meetingSuggestions",
  taskSuggestion: "taskSuggestions",
  address: "addresses",
  emailAddress: "emailAddresses",
  url: "urls",
  phoneNumber: "phoneNumbers",
  contact: "contacts",
  flightReservations: "flightReservations",
  parcelDeliveries: "parcelDeliveries"
};
var Entities_getEntities = function getEntities() {
  return createEntities(getInitialDataProp("entities"));
};
var Entities_getEntitiesByType = function getEntitiesByType(entityType) {
  var entities = createEntities(getInitialDataProp("entities"));
  checkPermissionsAndThrow(entityPermissions[entityType] !== undefined ? entityPermissions[entityType] : 1
  /* readItem */
  , entityType);
  var entityProperty = entityKeys[entityType];

  if (entityProperty === undefined) {
    // bad entity name
    return null;
  }

  return entities[entityProperty];
};
var Entities_getFilteredEntitiesByName = function getFilteredEntitiesByName(name) {
  return createFilteredEntities(getInitialDataProp("filteredEntities"), name);
};
var Entities_getRegExMatches = function getRegExMatches() {
  return getInitialDataProp("regExMatches");
};
var Entities_getRegExMatchesByName = function getRegExMatchesByName(name) {
  var regExMatches = getInitialDataProp("regExMatches") || {};
  return regExMatches[name];
};
var Entities_getSelectedEntities = function getSelectedEntities() {
  return createEntities(getInitialDataProp("selectedEntities"));
};
var Entities_getSelectedRegExMatches = function getSelectedRegExMatches() {
  return getInitialDataProp("selectedRegExMatches");
};
// CONCATENATED MODULE: ./src/api/getMessageRead.ts















function getMessageRead() {
  var sender = getInitialDataProp("sender");
  var from = getInitialDataProp("from");
  var dateTimeCreated = getInitialDataProp("dateTimeCreated");
  var dateTimeModified = getInitialDataProp("dateTimeModified");
  var end = getInitialDataProp("end");
  var start = getInitialDataProp("start");
  var messageRead = objectDefine({}, {
    attachments: getInitialDataProp("attachments"),
    bcc: (getInitialDataProp("bcc") || []).map(createEmailAddressDetails),
    body: getBodySurface(false
    /* compose */
    ),
    categories: getCategoriesSurface(),
    cc: (getInitialDataProp("cc") || []).map(createEmailAddressDetails),
    conversationId: getInitialDataProp("conversationId"),
    dateTimeCreated: dateTimeCreated ? new Date(dateTimeCreated) : undefined,
    dateTimeModified: dateTimeModified ? new Date(dateTimeModified) : undefined,
    end: end ? new Date(end) : undefined,
    from: from ? createEmailAddressDetails(from) : undefined,
    internetHeaders: getInternetHeadersSurface(false
    /* compose */
    ),
    internetMessageId: getInitialDataProp("internetMessageId"),
    itemClass: getInitialDataProp("itemClass"),
    itemId: getInitialDataProp("id"),
    itemType: "message",
    location: getInitialDataProp("location"),
    move: moveToFolder,
    normalizedSubject: getInitialDataProp("normalizedSubject"),
    notificationMessages: getNotificationMessageSurface(),
    seriesId: getInitialDataProp("seriesId"),
    sender: sender ? createEmailAddressDetails(sender) : undefined,
    start: start ? new Date(start) : undefined,
    subject: getInitialDataProp("subject"),
    to: (getInitialDataProp("to") || []).map(createEmailAddressDetails),
    displayReplyForm: displayReplyForm,
    displayReplyAllForm: displayReplyAllForm,
    getAttachmentContentAsync: getAttachmentContent,
    getEntities: Entities_getEntities,
    getEntitiesByType: Entities_getEntitiesByType,
    getFilteredEntitiesByName: Entities_getFilteredEntitiesByName,
    getInitializationContextAsync: getInitializationContext,
    getRegExMatches: Entities_getRegExMatches,
    getRegExMatchesByName: Entities_getRegExMatchesByName,
    getSelectedEntities: Entities_getSelectedEntities,
    getSelectedRegExMatches: Entities_getSelectedRegExMatches,
    loadCustomPropertiesAsync: loadCustomProperties,
    delayDeliveryTime: getDelayDeliverySurface(false
    /* compose */
    )
  });
  return messageRead;
}
// CONCATENATED MODULE: ./src/validation/validateAttachments.ts




function validateAddFileAttachmentApis(attachmentName) {
  if (isNullOrUndefined(attachmentName) || attachmentName === "" || !(typeof attachmentName === "string")) {
    throw createArgumentError("attachmentName");
  }

  throwOnOutOfRange(attachmentName.length, 0, MaxAttachmentNameLength, "attachmentName");
}
// CONCATENATED MODULE: ./src/methods/addFileAttachment.ts







function addFileAttachment(uri, attachmentName) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.addFileAttachmentAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var isInline = false;

  if (!!commonParameters.options) {
    isInline = !!commonParameters.options.isInline;
  }

  var name = attachmentName;
  var parameters = {
    uri: uri,
    name: name,
    isInline: isInline
  };
  addFileAttachment_validateParameters(parameters);
  standardInvokeHostMethod(16
  /* addFileAttachment */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function addFileAttachment_validateParameters(parameters) {
  validateStringParam("uri", parameters.uri);
  throwOnOutOfRange(parameters.uri.length, 0, MaxUrlLength, "uri");
  validateAddFileAttachmentApis(parameters.name);
}
// CONCATENATED MODULE: ./src/methods/addBase64FileAttachment.ts





function addBase64FileAttachment(base64String, name) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.addBase64FileAttachmentAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var isInline = false;

  if (!!commonParameters.options) {
    isInline = !!commonParameters.options.isInline;
  }

  var parameters = {
    base64String: base64String,
    name: name,
    isInline: isInline
  };
  addBase64FileAttachment_validateParameters(parameters);
  standardInvokeHostMethod(148
  /* addBase64FileAttachment */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function addBase64FileAttachment_validateParameters(parameters) {
  validateStringParam("base64Encoded", parameters.base64String);
  validateAddFileAttachmentApis(parameters.name);
}
// CONCATENATED MODULE: ./src/methods/addItemAttachment.ts






function addItemAttachment(itemId, name) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.addItemAttachmentAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    itemId: itemId,
    name: name
  };
  addItemAttachment_validateParameters(parameters);
  standardInvokeHostMethod(19
  /* addItemAttachment */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function addItemAttachment_validateParameters(parameters) {
  validateStringParam("itemId", parameters.itemId);
  validateStringParam("attachmentName", parameters.name);
  throwOnOutOfRange(parameters.itemId.length, 0, MaxItemIdLength, "itemId");
  throwOnOutOfRange(parameters.name.length, 0, MaxAttachmentNameLength, "attachmentName");
}
// CONCATENATED MODULE: ./src/methods/close.ts

function close_close() {
  standardInvokeHostMethod(41
  /* close */
  , undefined, undefined, undefined, undefined);
}
// CONCATENATED MODULE: ./src/utils/CustomJsonAttachmentsResponse.ts

function CustomJsonAttachmentsResponse(arrayOfAttachmentJsonData) {
  var customJsonResponse = [];

  if (!!arrayOfAttachmentJsonData) {
    for (var i = 0; i < arrayOfAttachmentJsonData.length; i++) {
      if (!!arrayOfAttachmentJsonData[i]) {
        var newAttachment = convertAttachmentType(arrayOfAttachmentJsonData[i]);
        customJsonResponse.push(newAttachment);
      }
    }
  }

  return customJsonResponse;
}

function convertAttachmentType(attachmentDetails) {
  if (attachmentDetails.attachmentType !== null || attachmentDetails.attachmentType !== undefined) {
    switch (attachmentDetails.attachmentType) {
      case 0:
        {
          attachmentDetails.attachmentType = MailboxEnums.AttachmentType.File;
          break;
        }

      case 1:
        {
          attachmentDetails.attachmentType = MailboxEnums.AttachmentType.Item;
          break;
        }

      case 2:
        {
          attachmentDetails.attachmentType = MailboxEnums.AttachmentType.Cloud;
          break;
        }
    }
  }

  return attachmentDetails;
}
// CONCATENATED MODULE: ./src/methods/getAttachments.ts




function getAttachments_getAttachments() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getAttachmentsAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(149
  /* getAttachments */
  , commonParameters.asyncContext, commonParameters.callback, undefined, CustomJsonAttachmentsResponse);
}
// CONCATENATED MODULE: ./src/methods/getSelectedData.ts



function getSelectedData(coercionType) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.getSelectedDataAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    coercionType: coercionType
  };
  getSelectedData_validateParameters(parameters);
  standardInvokeHostMethod(28
  /* getSelectedData */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function getSelectedData_validateParameters(parameters) {// TODO: add validation of parameters
  // Throw if there is an error
}
// CONCATENATED MODULE: ./src/methods/removeAttachment.ts






function removeAttachment(attachmentId) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.removeAttachmentAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    attachmentId: attachmentId
  };
  removeAttachment_validateParameters(parameters);
  standardInvokeHostMethod(20
  /* removeAttachment */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function removeAttachment_validateParameters(parameters) {
  validateStringParam("attachmentId", parameters.attachmentId);
  throwOnOutOfRange(parameters.attachmentId.length, 0, MaxRemoveIdLength, "attachmentId");
}
// CONCATENATED MODULE: ./src/methods/save.ts



function save() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "item.saveAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(32
  /* save */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/validation/validateRecipientParameters.ts




function validateRecipientParameters(parameters) {
  if (Array.isArray(parameters.recipientArray)) {
    if (parameters.recipientArray.length > recipientsLimit) {
      throw createArgumentOutOfRange("recipients", parameters.recipientArray.length);
    }

    var validatedRecipients = parameters.recipientArray.map(function (recipient) {
      if (isNullOrUndefined(recipient)) {
        throw createArgumentError("recipients");
      }

      if (typeof recipient === "string") {
        throwOnInvalidDisplayNameOrEmail(recipient, recipient);
        return createEmailAddressForHost(recipient, recipient);
      } else if (typeof recipient === "object") {
        throwOnInvalidDisplayNameOrEmail(recipient.displayName, recipient.emailAddress);
        return createEmailAddressForHost(recipient.displayName, recipient.emailAddress);
      } else {
        throw createArgumentError("recipients");
      }
    });
    parameters.recipientArray = validatedRecipients;
  } else {
    throw createArgumentError("recipients");
  }
}

function throwOnInvalidDisplayNameOrEmail(displayName, email) {
  if (!displayName && !email) {
    throw createArgumentError("recipients");
  } else if (typeof displayName === "string" && displayName.length > displayNameLengthLimit) {
    throw createArgumentOutOfRange("recipients", displayName.length, Object(ExtensibilityStrings["a" /* getString */])("l_DisplayNameTooLong_Text"));
  } else if (typeof email === "string" && email.length > maxSmtpLength) {
    throw createArgumentOutOfRange("recipients", email.length, Object(ExtensibilityStrings["a" /* getString */])("l_EmailAddressTooLong_Text"));
  } else if (typeof displayName !== "string" && typeof email !== "string") {
    throw createArgumentError("recipients");
  }
}

function createEmailAddressForHost(displayName, email) {
  return {
    address: email,
    name: displayName
  };
}
// CONCATENATED MODULE: ./src/methods/addRecipients.ts





function addRecipients(namespace) {
  return function (recipientArray) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    checkPermissionsAndThrow(2
    /* readWriteItem */
    , namespace + ".addAsync");
    var commonParameters = parseCommonArgs(args, false
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    var parameters = {
      recipientField: RecipientFields[namespace],
      recipientArray: recipientArray
    };
    validateRecipientParameters(parameters);
    standardInvokeHostMethod(22
    /* addRecipients */
    , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
  };
}
// CONCATENATED MODULE: ./src/methods/getRecipients.ts





function getRecipients(namespace) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    checkPermissionsAndThrow(1
    /* readItem */
    , namespace + ".getAsync");
    var commonParameters = parseCommonArgs(args, true
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    standardInvokeHostMethod(15
    /* getRecipients */
    , commonParameters.asyncContext, commonParameters.callback, {
      recipientField: RecipientFields[namespace]
    }, getRecipients_format);
  };
}

function getRecipients_format(rawInput) {
  // getAsync returns empty array when no recipients, not null.
  if (rawInput === null || rawInput === undefined) {
    return [];
  }

  return rawInput.map(function (input) {
    return createEmailAddressDetails(input);
  });
}
// CONCATENATED MODULE: ./src/methods/setRecipients.ts





function setRecipients(namespace) {
  return function (recipientArray) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    checkPermissionsAndThrow(2
    /* readWriteItem */
    , namespace + ".setAsync");
    var commonParameters = parseCommonArgs(args, false
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    var parameters = {
      recipientField: RecipientFields[namespace],
      recipientArray: recipientArray
    };
    validateRecipientParameters(parameters);
    standardInvokeHostMethod(21
    /* setRecipients */
    , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
  };
}
// CONCATENATED MODULE: ./src/api/getRecipientsSurface.ts




function getRecipientsSurface(namespace) {
  return objectDefine({}, {
    addAsync: addRecipients(namespace),
    getAsync: getRecipients(namespace),
    setAsync: setRecipients(namespace)
  });
}
// CONCATENATED MODULE: ./src/methods/getFrom.ts



function getFrom(namespace) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    checkPermissionsAndThrow(1
    /* readItem */
    , namespace + ".getAsync");
    var commonParameters = parseCommonArgs(args, true
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    standardInvokeHostMethod(107
    /* getFrom */
    , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
  };
}
// CONCATENATED MODULE: ./src/api/getFromSurface.ts


function getFromSurface(namespace) {
  return objectDefine({}, {
    getAsync: getFrom(namespace)
  });
}
// CONCATENATED MODULE: ./src/methods/getSubject.ts



function getSubject() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "subject.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(18
  /* getSubject */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/setSubject.ts




 // The maximum subject length

var MaximumSubjectLength = 255;
function setSubject(subject) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "subject.setAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    subject: subject
  };
  setSubject_validateParameters(parameters);
  standardInvokeHostMethod(17
  /* setSubject */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function setSubject_validateParameters(parameters) {
  if (!(typeof parameters.subject === "string")) {
    throw createArgumentTypeError("subject", typeof parameters.subject, "string");
  }

  throwOnOutOfRange(parameters.subject.length, 0, MaximumSubjectLength, "subject");
}
// CONCATENATED MODULE: ./src/api/getSubjectSurface.ts



function getSubjectSurface() {
  return objectDefine({}, {
    getAsync: getSubject,
    setAsync: setSubject
  });
}
// CONCATENATED MODULE: ./src/methods/getItemId.ts



function getItemId() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getItemIdAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(164
  /* getItemId */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/api/getMessageCompose.ts























function getMessageCompose() {
  var messageCompose = objectDefine({}, {
    bcc: getRecipientsSurface("bcc"),
    body: getBodySurface(true
    /* compose */
    ),
    categories: getCategoriesSurface(),
    cc: getRecipientsSurface("cc"),
    conversationId: getInitialDataProp("conversationId"),
    from: getFromSurface("from"),
    internetHeaders: getInternetHeadersSurface(true
    /* compose */
    ),
    itemType: "message",
    notificationMessages: getNotificationMessageSurface(),
    seriesId: getInitialDataProp("seriesId"),
    subject: getSubjectSurface(),
    to: getRecipientsSurface("to"),
    addFileAttachmentAsync: addFileAttachment,
    addBase64FileAttachmentAsync: addBase64FileAttachment,
    addItemAttachmentAsync: addItemAttachment,
    close: close_close,
    getAttachmentsAsync: getAttachments_getAttachments,
    getAttachmentContentAsync: getAttachmentContent,
    getInitializationContextAsync: getInitializationContext,
    getItemIdAsync: getItemId,
    getSelectedDataAsync: getSelectedData,
    loadCustomPropertiesAsync: loadCustomProperties,
    removeAttachmentAsync: removeAttachment,
    saveAsync: save,
    setSelectedDataAsync: setSelectedData(29
    /* setSelectedData */
    ),
    delayDeliveryTime: getDelayDeliverySurface(true
    /* compose */
    )
  });
  return messageCompose;
}
// CONCATENATED MODULE: ./src/validation/validateEnhancedLocation.ts




function validateLocationIdentifiers(locationIdentifiers) {
  if (isNullOrUndefined(locationIdentifiers)) {
    throw createNullArgumentError("locationIdentifier");
  }

  if (!(locationIdentifiers instanceof Array)) {
    throw createArgumentTypeError("locationIdentifier", typeof locationIdentifiers, "Array");
  }

  if (locationIdentifiers.length === 0) {
    throw createArgumentError("locationIdentifier");
  }

  for (var _i = 0, locationIdentifiers_1 = locationIdentifiers; _i < locationIdentifiers_1.length; _i++) {
    var locationIdentifier = locationIdentifiers_1[_i];
    validateLocationIdentifier(locationIdentifier);
  }
}

function validateLocationIdentifier(locationIdentifier) {
  if (isNullOrUndefined(locationIdentifier) || isNullOrUndefined(locationIdentifier.id) || isNullOrUndefined(locationIdentifier.type)) {
    throw createNullArgumentError("locationIdentifier");
  }

  if (locationIdentifier.type === MailboxEnums.LocationType.Room || locationIdentifier.type === MailboxEnums.LocationType.Custom) {
    validateIdParameter(locationIdentifier.id, locationIdentifier.type);
  } else {
    throw createArgumentError("type");
  }
}

function validateIdParameter(id, type) {
  if (id === "") {
    throw createArgumentError("id");
  }

  if (type === MailboxEnums.LocationType.Room) {
    if (id.length > maxSmtpLength) {
      throw createArgumentError("id");
    }
  }
}
// CONCATENATED MODULE: ./src/methods/addEnhancedLocations.ts




function addEnhancedLocations(enhancedLocations) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "enhancedLocations.addAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    enhancedLocations: enhancedLocations
  };
  addEnhancedLocations_validateParameters(parameters);
  standardInvokeHostMethod(155
  /* addEnhancedLocations */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function addEnhancedLocations_validateParameters(parameters) {
  validateLocationIdentifiers(parameters.enhancedLocations);
}
// CONCATENATED MODULE: ./src/methods/getEnhancedLocations.ts



function getEnhancedLocations() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "enhancedLocations.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(154
  /* getEnhancedLocations */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/removeEnhancedLocations.ts




function removeEnhancedLocations(enhancedLocations) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "enhancedLocations.removeAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    enhancedLocations: enhancedLocations
  };
  removeEnhancedLocations_validateParameters(parameters);
  standardInvokeHostMethod(156
  /* removeEnhancedLocations */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function removeEnhancedLocations_validateParameters(parameters) {
  validateLocationIdentifiers(parameters.enhancedLocations);
}
// CONCATENATED MODULE: ./src/api/getEnhancedLocationSurface.ts




function getEnhancedLocationsSurface(isCompose
/* compose */
) {
  var enhancedLocations = objectDefine({}, {
    getAsync: getEnhancedLocations
  });

  if (isCompose) {
    objectDefine(enhancedLocations, {
      addAsync: addEnhancedLocations,
      removeAsync: removeEnhancedLocations
    });
  }

  return enhancedLocations;
}
// CONCATENATED MODULE: ./src/validation/seriesTimeConstants.ts
// Constants
var StartYearKey = "startYear";
var StartMonthKey = "startMonth";
var StartDayKey = "startDay";
var EndYearKey = "endYear";
var EndMonthKey = "endMonth";
var EndDayKey = "endDay";
var NoEndDateKey = "noEndDate";
var StartTimeMinKey = "startTimeMin";
var DurationMinKey = "durationMin";
// CONCATENATED MODULE: ./src/validation/recurrenceConstants.ts
// Keys in the recurrence object
var StartDateKey = "startDate";
var EndDateKey = "endDate";
var StartTimeKey = "startTime";
var EndTimeKey = "endTime";
var RecurrenceTypeKey = "recurrenceType";
var SeriesTimeKey = "seriesTime";
var SeriesTimeJsonKey = "seriesTimeJson";
var RecurrenceTimeZoneKey = "recurrenceTimeZone";
var RecurrenceTimeZoneName = "name"; // Keys in the recurrence properties object.

var RecurrencePropertiesKey = "recurrenceProperties";
var IntervalKey = "interval";
var DaysKey = "days";
var DayOfMonthKey = "dayOfMonth";
var DayOfWeekKey = "dayOfWeek";
var WeekNumberKey = "weekNumber";
var MonthKey = "month";
var FirstDayOfWeekKey = "firstDayOfWeek";
// CONCATENATED MODULE: ./src/utils/seriesTimeUtils.ts



function prependZeroToString(number) {
  if (number < 0) {
    number = 1;
  }

  if (number < 10) {
    return "0" + number.toString();
  }

  return number.toString();
}
function throwOnInvalidDate(year, month, day) {
  if (!isValidDate(year, month, day)) {
    throw createArgumentError(SeriesTimeKey, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidDate_Text"));
  }
}
function isValidDate(year, month, day) {
  if (year < 1601 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  return true;
}
function throwOnInvalidDateString(dateString) {
  var regEx = new RegExp("^\\d{4}-(?:[0]\\d|1[0-2])-(?:[0-2]\\d|3[01])$");

  if (!regEx.test(dateString)) {
    throw createArgumentError(SeriesTimeKey, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidDate_Text"));
  }
}
// CONCATENATED MODULE: ./src/api/SeriesTime.ts






var SeriesTime_SeriesTime =
/** @class */
function () {
  function SeriesTime() {
    this.startYear = 0;
    this.startMonth = 0;
    this.startDay = 0;
    this.endYear = 0;
    this.endMonth = 0;
    this.endDay = 0;
    this.startTimeMinutes = 0;
    this.durationMinutes = 0;
  }

  SeriesTime.prototype.getDuration = function () {
    return this.durationMinutes;
  };

  SeriesTime.prototype.getEndTime = function () {
    // "THH:MM:SS.mmm"
    var endTimeMinutes = this.startTimeMinutes + this.durationMinutes;
    var minutes = endTimeMinutes % 60;
    var hours = Math.floor(endTimeMinutes / 60) % 24; // % 24 so that meetings with long durations won't produce hours > 24.

    return "T" + prependZeroToString(hours) + ":" + prependZeroToString(minutes) + ":00.000";
  };

  SeriesTime.prototype.getEndDate = function () {
    if (this.endYear === 0 && this.endMonth === 0 && this.endDay === 0) {
      return null;
    }

    return this.endYear.toString() + "-" + prependZeroToString(this.endMonth) + "-" + prependZeroToString(this.endDay);
  };

  SeriesTime.prototype.getStartDate = function () {
    return this.startYear.toString() + "-" + prependZeroToString(this.startMonth) + "-" + prependZeroToString(this.startDay);
  };

  SeriesTime.prototype.getStartTime = function () {
    // "THH:MM:SS.mmm"
    var minutes = this.startTimeMinutes % 60;
    var hours = Math.floor(this.startTimeMinutes / 60);
    return "T" + prependZeroToString(hours) + ":" + prependZeroToString(minutes) + ":00.000";
  };

  SeriesTime.prototype.setDuration = function (minutes) {
    if (minutes >= 0) {
      this.durationMinutes = minutes;
    } else {
      throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidTime_Text"));
    }
  };

  SeriesTime.prototype.setEndDate = function (yearOrDateString, month, day) {
    if (yearOrDateString !== null && !isNullOrUndefined(month) && day !== null) {
      this.setDateHelper(false, yearOrDateString, month, day);
    } else if (yearOrDateString !== null) {
      this.setDateHelper(false, yearOrDateString);
    } else if (yearOrDateString == null) {
      this.endYear = 0;
      this.endMonth = 0;
      this.endDay = 0;
    }
  };

  SeriesTime.prototype.setStartDate = function (yearOrDateString, month, day) {
    if (yearOrDateString !== null && !isNullOrUndefined(month) && day !== null) {
      this.setDateHelper(true, yearOrDateString, month, day);
    } else if (yearOrDateString !== null) {
      this.setDateHelper(true, yearOrDateString);
    }
  };

  SeriesTime.prototype.setStartTime = function (hoursOrTimeString, minutes) {
    if (!isNullOrUndefined(hoursOrTimeString) && !isNullOrUndefined(minutes)) {
      var totalMinutes = hoursOrTimeString * 60 + minutes;

      if (totalMinutes >= 0) {
        this.startTimeMinutes = totalMinutes;
      } else {
        throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidTime_Text"));
      }
    } else if (!isNullOrUndefined(hoursOrTimeString)) {
      var timeString = hoursOrTimeString; // Add a random date, so DateTime object can parse it, then pull the hours and minutes out of it.
      // We are tacking a "Z" for UTC at the end here, because certain JS engines (namely PhantomJS) interprets
      // the date string differently if TimeZone is left off. All we care about is getting the time out, so we
      // just call the getUTC*() functions below.

      var newDateString = "2017-01-15" + timeString + "Z"; // "THH:MM:SS.mmm"

      var regEx = new RegExp("^T[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d{3}$");

      if (!regEx.test(timeString)) {
        throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidTime_Text"));
      }

      var dateObject = new Date(newDateString);

      if (!isNullOrUndefined(dateObject) && !isNaN(dateObject.getUTCHours()) && !isNaN(dateObject.getUTCMinutes())) {
        this.startTimeMinutes = dateObject.getUTCHours() * 60 + dateObject.getUTCMinutes();
      } else {
        throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidTime_Text"));
      }
    }
  };

  SeriesTime.prototype.isValid = function () {
    if (!isValidDate(this.startYear, this.startMonth, this.startDay)) {
      return false;
    } // It's fine if there is no end date


    if (this.endDay !== 0 && this.endMonth !== 0 && this.endYear !== 0) {
      if (!isValidDate(this.endYear, this.endMonth, this.endDay)) {
        return false;
      }
    }

    if (this.startTimeMinutes < 0 || this.durationMinutes <= 0) {
      return false;
    }

    return true;
  };

  SeriesTime.prototype.exportToSeriesTimeJson = function () {
    var result = {};
    result[StartYearKey] = this.startYear;
    result[StartMonthKey] = this.startMonth;
    result[StartDayKey] = this.startDay;

    if (this.endYear === 0 && this.endMonth === 0 && this.endDay === 0) {
      result[NoEndDateKey] = true;
    } else {
      result[EndYearKey] = this.endYear;
      result[EndMonthKey] = this.endMonth;
      result[EndDayKey] = this.endDay;
    }

    result[StartTimeMinKey] = this.startTimeMinutes;

    if (this.durationMinutes > 0) {
      result[DurationMinKey] = this.durationMinutes;
    }

    return result;
  };

  SeriesTime.prototype.importFromSeriesTimeJsonObject = function (jsonObject) {
    this.startYear = jsonObject[StartYearKey];
    this.startMonth = jsonObject[StartMonthKey];
    this.startDay = jsonObject[StartDayKey];

    if (jsonObject[NoEndDateKey] != null && typeof jsonObject[NoEndDateKey] === "boolean") {
      this.endYear = 0;
      this.endMonth = 0;
      this.endDay = 0;
    } else {
      this.endYear = jsonObject[EndYearKey];
      this.endMonth = jsonObject[EndMonthKey];
      this.endDay = jsonObject[EndDayKey];
    }

    this.startTimeMinutes = jsonObject[StartTimeMinKey];
    this.durationMinutes = jsonObject[DurationMinKey];
  };

  SeriesTime.prototype.setDateHelper = function (isStart, yearOrDateString, month, day) {
    var yearCalculated = 0;
    var monthCalculated = 0;
    var dayCalculated = 0;

    if (yearOrDateString !== null && !isNullOrUndefined(month) && day !== null) {
      throwOnInvalidDate(yearOrDateString, month + 1, day);
      yearCalculated = yearOrDateString;
      monthCalculated = month + 1;
      dayCalculated = day;
    } else if (yearOrDateString !== null) {
      // This may seem a little weird because we are grabbing the GetUTC...() functions
      // when we don't consider this date to be UTC, but really all we care about is "YYYY-MM-DD" format
      // so we are passing it into the DateTime Constructor (which takes it in as UTC) and getting out those values
      var dateString = yearOrDateString;
      throwOnInvalidDateString(dateString);
      var dateObject = new Date(dateString);

      if (dateObject !== null && !isNaN(dateObject.getUTCFullYear()) && !isNaN(dateObject.getUTCMonth()) && !isNaN(dateObject.getUTCDate())) {
        throwOnInvalidDate(dateObject.getUTCFullYear(), dateObject.getUTCMonth() + 1, dateObject.getUTCDate());
        yearCalculated = dateObject.getUTCFullYear();
        monthCalculated = dateObject.getUTCMonth() + 1;
        dayCalculated = dateObject.getUTCDate();
      }
    }

    if (yearCalculated !== 0 && monthCalculated !== 0 && dayCalculated !== 0) {
      if (isStart) {
        this.startYear = yearCalculated;
        this.startMonth = monthCalculated;
        this.startDay = dayCalculated;
      } else {
        this.endYear = yearCalculated;
        this.endMonth = monthCalculated;
        this.endDay = dayCalculated;
      }
    }
  };

  SeriesTime.prototype.isEndAfterStart = function () {
    if (this.endYear === 0 && this.endMonth === 0 && this.endDay === 0) {
      return true;
    }

    var startDateTime = new Date();
    startDateTime.setFullYear(this.startYear);
    startDateTime.setMonth(this.startMonth - 1);
    startDateTime.setDate(this.startDay);
    var endDateTime = new Date();
    endDateTime.setFullYear(this.endYear);
    endDateTime.setMonth(this.endMonth - 1);
    endDateTime.setDate(this.endDay);
    return endDateTime >= startDateTime; // We should end on either the same date or later than the start Date
  };

  return SeriesTime;
}();


// CONCATENATED MODULE: ./src/methods/getRecurrence.ts




function getRecurrence() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "recurrenceProperties.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(103
  /* getRecurrence */
  , commonParameters.asyncContext, commonParameters.callback, undefined, seriesTimeJsonConverter);
}
function seriesTimeJsonConverter(rawInput) {
  // Convert SeriesTimeJson to SeriesTime object
  if (rawInput !== null) {
    if (rawInput.seriesTimeJson !== null) {
      var seriesTime = new SeriesTime_SeriesTime();
      seriesTime.importFromSeriesTimeJsonObject(rawInput.seriesTimeJson);
      delete rawInput.seriesTimeJson;
      rawInput.seriesTime = seriesTime;
    }
  }

  return rawInput;
}
// CONCATENATED MODULE: ./src/validation/validateRecurrenceObject.ts






function validateRecurrenceObject(recurrenceObject) {
  if (isNullOrUndefined(recurrenceObject)) {
    // A Null RecurrenceObject is valid
    return;
  }

  recurrenceObject = recurrenceObject; // Check that it has a recurrenceType

  if (isNullOrUndefined(recurrenceObject.recurrenceType)) {
    throw createNullArgumentError(RecurrenceTypeKey);
  } // Validate SeriesTime


  if (isNullOrUndefined(recurrenceObject.seriesTime)) {
    throw createNullArgumentError(SeriesTimeKey);
  }

  if (!(recurrenceObject.seriesTime instanceof SeriesTime_SeriesTime) || !recurrenceObject.seriesTime.isValid()) {
    throw createArgumentError(SeriesTimeKey);
  }

  if (!recurrenceObject.seriesTime.isEndAfterStart()) {
    throw createArgumentError(SeriesTimeKey, Object(ExtensibilityStrings["a" /* getString */])("l_InvalidEventDates_Text"));
  } // Check the Type Parameter (Daily, Weekday, Weekly, Monthly, Yearly)


  throwOnInvalidRecurrenceType(recurrenceObject.recurrenceType); // Based on the type check that recurrence properties correspond to the correct type.
  // note that "Weekday" recurrence type has no additional properties.

  if (recurrenceObject.recurrenceType !== MailboxEnums.RecurrenceType.Weekday) {
    // Weekday can have Null Properties, other properties cannot.
    if (isNullOrUndefined(recurrenceObject.recurrenceProperties)) {
      throw createNullArgumentError(RecurrenceTypeKey);
    }
  }

  if (!isNullOrUndefined(recurrenceObject.recurrenceTimeZone)) {
    if (isNullOrUndefined(recurrenceObject.recurrenceTimeZone.name)) {
      throw createNullArgumentError(RecurrenceTimeZoneName);
    }

    if (typeof recurrenceObject.recurrenceTimeZone.name !== "string") {
      throw createArgumentTypeError(RecurrenceTimeZoneName, typeof recurrenceObject.recurrenceTimeZone.name, "string");
    }
  }

  if (recurrenceObject.recurrenceType === MailboxEnums.RecurrenceType.Daily) {
    throwOnInvalidDailyRecurrence(recurrenceObject.recurrenceProperties);
  } else if (recurrenceObject.recurrenceType === MailboxEnums.RecurrenceType.Weekly) {
    throwOnInvalidWeeklyRecurrence(recurrenceObject.recurrenceProperties);
  } else if (recurrenceObject.recurrenceType === MailboxEnums.RecurrenceType.Monthly) {
    throwOnInvalidMonthlyRecurrence(recurrenceObject.recurrenceProperties);
  } else if (recurrenceObject.recurrenceType === MailboxEnums.RecurrenceType.Yearly) {
    throwOnInvalidYearlyRecurrence(recurrenceObject.recurrenceProperties);
  }
}

function throwOnInvalidRecurrenceType(recurrenceType) {
  if (recurrenceType !== MailboxEnums.RecurrenceType.Daily && recurrenceType !== MailboxEnums.RecurrenceType.Weekly && recurrenceType !== MailboxEnums.RecurrenceType.Weekday && recurrenceType !== MailboxEnums.RecurrenceType.Yearly && recurrenceType !== MailboxEnums.RecurrenceType.Monthly) {
    throw createArgumentError(RecurrenceTypeKey);
  }
}

function throwOnInvalidRecurrenceInterval(recurrenceProperties) {
  if (isNullOrUndefined(recurrenceProperties.interval)) {
    throw createNullArgumentError(IntervalKey);
  }

  if (typeof recurrenceProperties.interval !== "number") {
    throw createArgumentTypeError(IntervalKey, typeof recurrenceProperties.interval, "number");
  }

  if (recurrenceProperties.interval <= 0) {
    throw createArgumentError(IntervalKey);
  }
}

function throwOnInvalidDailyRecurrence(recurrenceProperties) {
  throwOnInvalidRecurrenceInterval(recurrenceProperties);
}

function throwOnInvalidWeeklyRecurrence(recurrenceProperties) {
  throwOnInvalidRecurrenceInterval(recurrenceProperties);

  if (isNullOrUndefined(recurrenceProperties.days)) {
    throw createArgumentTypeError(DaysKey);
  }

  if (!(recurrenceProperties.days instanceof Array)) {
    throw createArgumentTypeError(DaysKey);
  }

  throwOnInvalidDaysArray(recurrenceProperties.days);

  if (!isNullOrUndefined(recurrenceProperties.firstDayOfWeek)) {
    if (typeof recurrenceProperties.firstDayOfWeek !== "string") {
      throw createArgumentTypeError(FirstDayOfWeekKey);
    }

    if (!verifyDays(recurrenceProperties.firstDayOfWeek, false
    /*CheckGroupedDays*/
    )) {
      throw createArgumentError(FirstDayOfWeekKey);
    }
  }
}

function throwOnInvalidDaysArray(daysArray) {
  for (var i = 0; i < daysArray.length; i++) {
    if (!verifyDays(daysArray[i], false)) {
      throw createArgumentError(DaysKey);
    }
  }
}

function verifyDays(dayEnum, checkGroupedDays) {
  var fRegularDay = dayEnum === MailboxEnums.Days.Mon || dayEnum === MailboxEnums.Days.Tue || dayEnum === MailboxEnums.Days.Wed || dayEnum === MailboxEnums.Days.Thu || dayEnum === MailboxEnums.Days.Fri || dayEnum === MailboxEnums.Days.Sat || dayEnum === MailboxEnums.Days.Sun;

  if (checkGroupedDays) {
    var fGroupedDay = dayEnum === MailboxEnums.Days.WeekendDay || dayEnum === MailboxEnums.Days.Weekday || dayEnum === MailboxEnums.Days.Day;
    return fGroupedDay || fRegularDay;
  } else {
    return fRegularDay;
  }
}

function throwOnInvalidMonthlyRecurrence(recurrenceProperties) {
  if (isNullOrUndefined(recurrenceProperties.interval)) {
    throw createNullArgumentError(IntervalKey);
  }

  if (typeof recurrenceProperties.interval !== "number") {
    throw createArgumentTypeError(IntervalKey, typeof recurrenceProperties.interval, "number");
  }

  if (!isNullOrUndefined(recurrenceProperties.dayOfMonth)) {
    if (typeof recurrenceProperties.dayOfMonth !== "number") {
      throw createArgumentTypeError(DayOfMonthKey, typeof recurrenceProperties.dayOfMonth, "number");
    }

    throwOnInvalidDayOfMonth(recurrenceProperties.dayOfMonth);
  } else if (!isNullOrUndefined(recurrenceProperties.dayOfWeek) && !isNullOrUndefined(recurrenceProperties.weekNumber)) {
    if (typeof recurrenceProperties.dayOfWeek !== "string") {
      throw createArgumentTypeError(DayOfWeekKey, typeof recurrenceProperties.dayOfWeek, "string");
    }

    if (!verifyDays(recurrenceProperties.dayOfWeek, true)) {
      throw createArgumentError(DayOfWeekKey);
    }

    if (typeof recurrenceProperties.weekNumber !== "string") {
      throw createArgumentTypeError(WeekNumberKey, typeof recurrenceProperties.weekNumber, "string");
    }

    throwOnInvalidWeekNumber(recurrenceProperties.weekNumber);
  } else {
    throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_Recurrence_Error_Properties_Invalid_Text"));
  }
}

function throwOnInvalidWeekNumber(weekNumber) {
  if (weekNumber !== MailboxEnums.WeekNumber.First && weekNumber !== MailboxEnums.WeekNumber.Second && weekNumber !== MailboxEnums.WeekNumber.Third && weekNumber !== MailboxEnums.WeekNumber.Fourth && weekNumber !== MailboxEnums.WeekNumber.Last) {
    throw createArgumentError(WeekNumberKey);
  }
}

function throwOnInvalidDayOfMonth(iDayOfMonth) {
  if (iDayOfMonth < 1 || iDayOfMonth > 31) {
    throw createArgumentError(DayOfMonthKey);
  }
}

function throwOnInvalidYearlyRecurrence(recurrenceProperties) {
  // Verify Interval parameter
  if (isNullOrUndefined(recurrenceProperties.interval)) {
    throw createNullArgumentError(IntervalKey);
  }

  if (typeof recurrenceProperties.interval !== "number") {
    throw createArgumentTypeError(IntervalKey, typeof recurrenceProperties.interval, "number");
  } // Verify Month Parameter


  if (isNullOrUndefined(recurrenceProperties.month)) {
    throw createNullArgumentError(MonthKey);
  }

  if (typeof recurrenceProperties.month !== "string") {
    throw createArgumentTypeError(MonthKey, typeof recurrenceProperties.month, "string");
  }

  throwOnInvalidMonth(recurrenceProperties.month);

  if (!isNullOrUndefined(recurrenceProperties.dayOfMonth)) {
    if (typeof recurrenceProperties.dayOfMonth !== "number") {
      throw createArgumentTypeError(DayOfMonthKey, typeof recurrenceProperties.dayOfMonth, "number");
    }

    throwOnInvalidDayOfMonth(recurrenceProperties.dayOfMonth);
  } else if (!isNullOrUndefined(recurrenceProperties.weekNumber) && !isNullOrUndefined(recurrenceProperties.dayOfWeek)) {
    if (typeof recurrenceProperties.dayOfWeek !== "string") {
      throw createArgumentTypeError(DayOfWeekKey, typeof recurrenceProperties.dayOfWeek, "string");
    }

    if (!verifyDays(recurrenceProperties.dayOfWeek, true)) {
      throw createArgumentError(DayOfWeekKey);
    }

    if (typeof recurrenceProperties.weekNumber !== "string") {
      throw createArgumentTypeError(WeekNumberKey, typeof recurrenceProperties.weekNumber, "string");
    }

    throwOnInvalidWeekNumber(recurrenceProperties.weekNumber);
  } else {
    throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_Recurrence_Error_Properties_Invalid_Text"));
  }
}

function throwOnInvalidMonth(month) {
  if (month !== MailboxEnums.Month.Jan && month !== MailboxEnums.Month.Feb && month !== MailboxEnums.Month.Mar && month !== MailboxEnums.Month.Apr && month !== MailboxEnums.Month.May && month !== MailboxEnums.Month.Jun && month !== MailboxEnums.Month.Jul && month !== MailboxEnums.Month.Aug && month !== MailboxEnums.Month.Sep && month !== MailboxEnums.Month.Oct && month !== MailboxEnums.Month.Nov && month !== MailboxEnums.Month.Dec) {
    throw createArgumentError(MonthKey);
  }
}
// CONCATENATED MODULE: ./src/validation/timeConstants.ts
var TimeType;

(function (TimeType) {
  TimeType[TimeType["start"] = 1] = "start";
  TimeType[TimeType["end"] = 2] = "end";
})(TimeType || (TimeType = {}));
// CONCATENATED MODULE: ./src/methods/getTime.ts




function getTime(namespace) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    checkPermissionsAndThrow(1
    /* readItem */
    , namespace + ".getAsync");
    var commonParameters = parseCommonArgs(args, true
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    standardInvokeHostMethod(24
    /* getTime */
    , commonParameters.asyncContext, commonParameters.callback, {
      TimeProperty: TimeType[namespace]
    }, getTime_format);
  };
}

function getTime_format(rawInput) {
  var ticks = rawInput;
  return new Date(ticks);
}
// CONCATENATED MODULE: ./src/methods/setTime.ts





var maxTime = 8640000000000000;
var minTime = -8640000000000000;
function setTime(namespace) {
  return function (date) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    checkPermissionsAndThrow(2
    /* readWriteItem */
    , namespace + ".setAsync");
    var commonParameters = parseCommonArgs(args, false
    /* callbackRequired */
    , false
    /* tryLegacy */
    );
    var parameters = {
      date: date
    };
    setTime_validateParameters(parameters);
    standardInvokeHostMethod(25
    /* setTime */
    , commonParameters.asyncContext, commonParameters.callback, {
      TimeProperty: TimeType[namespace],
      time: parameters.date.getTime()
    }, undefined);
  };
}

function setTime_validateParameters(parameters) {
  if (!(parameters.date instanceof Date)) {
    throw createArgumentTypeError("dateTime", typeof parameters.date, typeof Date);
  }

  if (isNaN(parameters.date.getTime())) {
    throw createArgumentError("dateTime");
  }

  if (parameters.date.getTime() < minTime || parameters.date.getTime() > maxTime) {
    throw createArgumentOutOfRange("dateTime");
  }
}
// CONCATENATED MODULE: ./src/api/getTimeSurface.ts



function getTimeSurface(namespace) {
  return objectDefine({}, {
    getAsync: getTime(namespace),
    setAsync: setTime(namespace)
  });
}
// CONCATENATED MODULE: ./src/methods/getLocation.ts



function getLocation() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "location.getAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(26
  /* getLocation */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/methods/setLocation.ts






var MaximumLocationLength = 255;
function setLocation(location) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "location.setAsync");
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    location: location
  };
  setLocation_validateParameters(parameters);
  standardInvokeHostMethod(27
  /* setLocation */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function setLocation_validateParameters(parameters) {
  if (!isNullOrUndefined(parameters.location)) {
    if (!(typeof parameters.location === "string")) {
      throw createArgumentTypeError("location", typeof parameters.location, "string");
    }

    throwOnOutOfRange(parameters.location.length, 0, MaximumLocationLength, "location");
  } else {
    throw createNullArgumentError("location");
  }
}
// CONCATENATED MODULE: ./src/api/getLocationSurface.ts



function getLocationSurface() {
  return objectDefine({}, {
    getAsync: getLocation,
    setAsync: setLocation
  });
}
// CONCATENATED MODULE: ./src/api/getAppointmentCompose.ts

























function getAppointmentCompose() {
  var appointmentCompose = objectDefine({}, {
    body: getBodySurface(true
    /* compose */
    ),
    categories: getCategoriesSurface(),
    end: getTimeSurface("end"),
    enhancedLocation: getEnhancedLocationsSurface(true
    /* compose */
    ),
    itemType: "appointment",
    location: getLocationSurface(),
    notificationMessages: getNotificationMessageSurface(),
    optionalAttendees: getRecipientsSurface("optionalAttendees"),
    organizer: getFromSurface("organizer"),
    recurrence: getRecurrenceSurface(true
    /* isCompose */
    ),
    requiredAttendees: getRecipientsSurface("requiredAttendees"),
    seriesId: getInitialDataProp("seriesId"),
    start: getTimeSurface("start"),
    subject: getSubjectSurface(),
    addFileAttachmentAsync: addFileAttachment,
    addBase64FileAttachmentAsync: addBase64FileAttachment,
    addItemAttachmentAsync: addItemAttachment,
    close: close_close,
    getAttachmentsAsync: getAttachments_getAttachments,
    getAttachmentContentAsync: getAttachmentContent,
    getInitializationContextAsync: getInitializationContext,
    getItemIdAsync: getItemId,
    getSelectedDataAsync: getSelectedData,
    loadCustomPropertiesAsync: loadCustomProperties,
    removeAttachmentAsync: removeAttachment,
    saveAsync: save,
    setSelectedDataAsync: setSelectedData(29
    /* setSelectedData */
    )
  });
  return appointmentCompose;
}
// CONCATENATED MODULE: ./src/methods/setRecurrence.ts









function setRecurrence(recurrencePattern) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  checkPermissionsAndThrow(2
  /* readWriteItem */
  , "recurrenceProperties.setAsync"); // check if instance, do not allow setRecurrence to work on instance (only works on series item)

  var seriesId = getAppointmentCompose().seriesId;

  if (!isNullOrUndefined(seriesId) && seriesId.length > 0) {
    throw createArgumentError(undefined, Object(ExtensibilityStrings["a" /* getString */])("l_Recurrence_Error_Instance_SetAsync_Text"));
  }

  validateRecurrenceObject(recurrencePattern);
  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var recurrenceData = convertSeriesTime(recurrencePattern);
  var parameters = {
    recurrenceData: recurrenceData
  };
  standardInvokeHostMethod(104
  /* setRecurrence */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function convertSeriesTime(recurrencePattern) {
  if (recurrencePattern !== null && recurrencePattern.seriesTime !== null) {
    if (recurrencePattern.seriesTime instanceof SeriesTime_SeriesTime) {
      var recurrencePatternCopy = {
        recurrenceProperties: recurrencePattern.recurrenceProperties,
        recurrenceTimeZone: recurrencePattern.recurrenceTimeZone,
        recurrenceType: recurrencePattern.recurrenceType,
        seriesTimeJson: recurrencePattern.seriesTime.exportToSeriesTimeJson()
      };
      return recurrencePatternCopy;
    }
  }

  return recurrencePattern;
}
// CONCATENATED MODULE: ./src/api/getRecurrenceSurface.ts



function getRecurrenceSurface(isCompose) {
  var recurrence = objectDefine({}, {
    getAsync: getRecurrence
  });

  if (isCompose) {
    objectDefine(recurrence, {
      setAsync: setRecurrence
    });
  }

  return recurrence;
}
// CONCATENATED MODULE: ./src/api/getAppointmentRead.ts














function getAppointmentRead() {
  var organizer = getInitialDataProp("organizer");
  var dateTimeCreated = getInitialDataProp("dateTimeCreated");
  var dateTimeModified = getInitialDataProp("dateTimeModified");
  var end = getInitialDataProp("end");
  var start = getInitialDataProp("start");
  var appointmentRead = objectDefine({}, {
    attachments: getInitialDataProp("attachments"),
    body: getBodySurface(false
    /* compose */
    ),
    categories: getCategoriesSurface(),
    dateTimeCreated: dateTimeCreated ? new Date(dateTimeCreated) : undefined,
    dateTimeModified: dateTimeModified ? new Date(dateTimeModified) : undefined,
    end: end ? new Date(end) : undefined,
    enhancedLocation: getEnhancedLocationsSurface(false
    /* isCompose */
    ),
    itemClass: getInitialDataProp("itemClass"),
    itemId: getInitialDataProp("id"),
    itemType: "appointment",
    location: getInitialDataProp("location"),
    normalizedSubject: getInitialDataProp("normalizedSubject"),
    notificationMessages: getNotificationMessageSurface(),
    optionalAttendees: (getInitialDataProp("optionalAttendees") || []).map(createEmailAddressDetails),
    organizer: organizer ? createEmailAddressDetails(organizer) : undefined,
    recurrence: getRecurrenceSurface(false
    /* isCompose */
    ),
    requiredAttendees: (getInitialDataProp("requiredAttendees") || []).map(createEmailAddressDetails),
    start: start ? new Date(start) : undefined,
    seriesId: getInitialDataProp("seriesId"),
    subject: getInitialDataProp("subject"),
    displayReplyForm: displayReplyForm,
    displayReplyAllForm: displayReplyAllForm,
    getAttachmentContentAsync: getAttachmentContent,
    getEntities: Entities_getEntities,
    getEntitiesByType: Entities_getEntitiesByType,
    getFilteredEntitiesByName: Entities_getFilteredEntitiesByName,
    getInitializationContextAsync: getInitializationContext,
    getRegExMatches: Entities_getRegExMatches,
    getRegExMatchesByName: Entities_getRegExMatchesByName,
    getSelectedEntities: Entities_getSelectedEntities,
    getSelectedRegExMatches: Entities_getSelectedRegExMatches,
    loadCustomPropertiesAsync: loadCustomProperties
  });
  return appointmentRead;
}
// CONCATENATED MODULE: ./src/utils/addEventSupport.ts
var addEventSupport_OSF = __webpack_require__(1);

var addEventSupport_Microsoft = __webpack_require__(4);

var addEventSupport = function addEventSupport(target) {
  addEventSupport_OSF.DDA.DispIdHost.addEventSupport(target, new addEventSupport_OSF.EventDispatch([addEventSupport_Microsoft.Office.WebExtension.EventType.RecipientsChanged, addEventSupport_Microsoft.Office.WebExtension.EventType.AppointmentTimeChanged, addEventSupport_Microsoft.Office.WebExtension.EventType.AttachmentsChanged, addEventSupport_Microsoft.Office.WebExtension.EventType.EnhancedLocationsChanged, addEventSupport_Microsoft.Office.WebExtension.EventType.InfobarClicked]));
};
// CONCATENATED MODULE: ./src/methods/registerConsent.ts



var ConsentStateType;

(function (ConsentStateType) {
  ConsentStateType[ConsentStateType["NotResponded"] = 0] = "NotResponded";
  ConsentStateType[ConsentStateType["NotConsented"] = 1] = "NotConsented";
  ConsentStateType[ConsentStateType["Consented"] = 2] = "Consented";
})(ConsentStateType || (ConsentStateType = {}));

function registerConsent(consentState) {
  var parameters = {
    consentState: consentState,
    extensionId: getInitialDataProp("extensionId")
  };
  registerConsent_validateParameters(consentState);
  standardInvokeHostMethod(40
  /* registerConsent */
  , undefined, undefined, parameters, undefined);
}

function registerConsent_validateParameters(consentState) {
  if (consentState !== ConsentStateType.Consented && consentState !== ConsentStateType.NotConsented && consentState !== ConsentStateType.NotResponded) {
    throw createArgumentOutOfRange("consentState");
  }
}
// CONCATENATED MODULE: ./src/methods/navigateToModule.ts





function navigateToModule(moduleName) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    module: moduleName
  };
  navigateToModule_validateParameters(moduleName);

  if (moduleName === MailboxEnums.ModuleType.Addins) {
    if (!!commonParameters.options && !!commonParameters.options.queryString) {
      parameters.queryString = commonParameters.options.queryString;
    } else {
      parameters.queryString = "";
    }
  }

  standardInvokeHostMethod(45
  /* navigateToModule */
  , commonParameters.asyncContext, commonParameters.callback, parameters, undefined);
}

function navigateToModule_validateParameters(moduleName) {
  if (isNullOrUndefined(moduleName)) {
    throw createNullArgumentError("module");
  }

  if (moduleName === "") {
    throw createArgumentError("module");
  }

  if (moduleName !== MailboxEnums.ModuleType.Addins) {
    throw createArgumentError("module");
  }
}
// CONCATENATED MODULE: ./src/methods/recordDataPoint.ts



function recordDataPoint(data) {
  if (isNullOrUndefined(data)) {
    throw createNullArgumentError("data");
  }

  standardInvokeHostMethod(402
  /* recordDataPoint */
  , undefined, undefined, data, undefined);
}
// CONCATENATED MODULE: ./src/methods/recordTrace.ts



function recordTrace(data) {
  if (isNullOrUndefined(data)) {
    throw createNullArgumentError("data");
  }

  standardInvokeHostMethod(401
  /* recordTrace */
  , undefined, undefined, data, undefined);
}
// CONCATENATED MODULE: ./src/methods/trackCtq.ts



function trackCtq(data) {
  if (isNullOrUndefined(data)) {
    throw createNullArgumentError("data");
  }

  standardInvokeHostMethod(400
  /* trackCtq */
  , undefined, undefined, data, undefined);
}
// CONCATENATED MODULE: ./src/methods/windowOpenOverrideHandler.ts

function windowOpenOverrideHandler(url, target, features, replace) {
  standardInvokeHostMethod(403
  /* windowOpenOverrideHandler */
  , undefined, undefined, {
    launchUrl: url
  }, undefined);
  return window;
}
// CONCATENATED MODULE: ./src/methods/logTelemetry.ts



function logTelemetry(data) {
  if (isNullOrUndefined(data)) {
    throw createNullArgumentError("data");
  }

  standardInvokeHostMethod(163
  /* logTelemetry */
  , undefined, undefined, {
    telemetryData: data
  }, undefined);
}
// CONCATENATED MODULE: ./src/utils/convertToLocalClientTime.ts
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};





function convertToLocalClientTime(timeValue) {
  // Validate parameter
  if (!(timeValue instanceof Date)) {
    throw createArgumentError("timeValue");
  } // Copy the date as to not modify the original value


  var date = new Date(timeValue.getTime());
  var offset = date.getTimezoneOffset() * -1;

  if (getInitialDataProp("timeZoneOffsets") !== null) {
    // Convert to UTC first, then convert to the desired time zone.
    date.setUTCMinutes(date.getUTCMinutes() - offset);
    offset = findOffset(date);
    date.setUTCMinutes(date.getUTCMinutes() + offset);
  } // Convert date to dictionary


  var retValue = __assign({
    timezoneOffset: offset
  }, dateToDictionary(date));

  return retValue;
}
// CONCATENATED MODULE: ./src/methods/displayPersonaCardAsync.ts




function displayPersonaCardAsync(ewsIdOrEmail) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  var parameters = {
    ewsIdOrEmail: ewsIdOrEmail
  };
  displayPersonaCardAsync_validateParameters(parameters);
  standardInvokeHostMethod(43
  /* displayPersonaCard */
  , commonParameters.asyncContext, commonParameters.callback, {
    ewsIdOrEmail: ewsIdOrEmail.trim()
  }, undefined);
}

function displayPersonaCardAsync_validateParameters(parameters) {
  if (!isNullOrUndefined(parameters.ewsIdOrEmail)) {
    displayPersonaCardAsync_throwOnInvalidItemId(parameters.ewsIdOrEmail);

    if (parameters.ewsIdOrEmail === "") {
      throw createArgumentError("ewsIdOrEmail", "ewsIdOrEmail cannot be empty.");
    }
  } else {
    throw createNullArgumentError("ewsIdOrEmail");
  }
}

function displayPersonaCardAsync_throwOnInvalidItemId(ewsIdOrEmail) {
  if (!(typeof ewsIdOrEmail === "string")) {
    throw createArgumentError("ewsIdOrEmail");
  }
}
// CONCATENATED MODULE: ./src/methods/getSharedProperties.ts



function getSharedProperties() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  checkPermissionsAndThrow(1
  /* readItem */
  , "item.getSharedPropertiesAsync");
  var commonParameters = parseCommonArgs(args, true
  /* callbackRequired */
  , false
  /* tryLegacy */
  );
  standardInvokeHostMethod(108
  /* getSharedProperties */
  , commonParameters.asyncContext, commonParameters.callback, undefined, undefined);
}
// CONCATENATED MODULE: ./src/utils/addSharedPropertiesSupport.ts





var addSharedPropertiesSupport_addSharedPropertiesSupport = function addSharedPropertiesSupport(target) {
  if (target && getInitialDataProp("isFromSharedFolder") && getHostItemType_getHostItemType() !== HostItemType.ItemLess) {
    objectDefine(target, {
      getSharedPropertiesAsync: getSharedProperties
    });
  }
};
// CONCATENATED MODULE: ./src/api/prepareApiSurface.ts


































var prepareApiSurface_OSF = __webpack_require__(1);

var prepareApiSurface_createMailboxSurface = function createMailboxSurface(target) {
  objectDefine(target, {
    ewsUrl: getInitialDataProp("ewsUrl"),
    restUrl: getInitialDataProp("restUrl"),
    displayAppointmentForm: displayAppointmentForm,
    displayMessageForm: displayMessageForm,
    displayPersonaCardAsync: displayPersonaCardAsync,
    getCallbackTokenAsync: getCallbackToken,
    getUserIdentityTokenAsync: getUserIdentityToken,
    logTelemetry: logTelemetry,
    makeEwsRequestAsync: makeEwsRequest,
    masterCategories: getMasterCategoriesSurface(),
    navigateToModuleAsync: navigateToModule,
    diagnostics: getDiagnosticsSurface(),
    userProfile: getUserProfileSurface(),
    convertToEwsId: convertToEwsId,
    convertToLocalClientTime: convertToLocalClientTime,
    convertToRestId: convertToRestId,
    convertToUtcClientTime: convertToUtcClientTime,
    // OWA Only APIs
    RegisterConsentAsync: registerConsent,
    GetIsRead: function GetIsRead() {
      return getInitialDataProp("isRead");
    },
    GetEndPointUrl: function GetEndPointUrl() {
      return getInitialDataProp("endNodeUrl");
    },
    GetConsentMetaData: function GetConsentMetaData() {
      return getInitialDataProp("consentMetadata");
    },
    GetMarketplaceContentMarket: function GetMarketplaceContentMarket() {
      return getInitialDataProp("marketplaceContentMarket");
    },
    GetMarketplaceAssetId: function GetMarketplaceAssetId() {
      return getInitialDataProp("marketplaceAssetId");
    },
    GetExtensionId: function GetExtensionId() {
      return getInitialDataProp("extensionId");
    },
    CloseApp: closeApp,
    recordDataPoint: recordDataPoint,
    recordTrace: recordTrace,
    trackCtq: trackCtq
  });

  if (getHostItemType_getHostItemType() !== HostItemType.MessageCompose && getHostItemType_getHostItemType() !== HostItemType.AppointmentCompose) {
    objectDefine(target, {
      displayNewAppointmentForm: displayNewAppointmentForm,
      displayNewMessageForm: displayNewMessageForm
    });
  }

  if (getAppName() === prepareApiSurface_OSF.AppName.OutlookWebApp && getInitialDataProp("openWindowOpen")) {
    window.open = windowOpenOverrideHandler;
  }

  return target;
};
var prepareApiSurface_getItem = function getItem() {
  var item = undefined;

  switch (getHostItemType_getHostItemType()) {
    case HostItemType.Message:
      item = getMessageRead();
      break;

    case HostItemType.MessageCompose:
      item = getMessageCompose();
      break;

    case HostItemType.Appointment:
      item = getAppointmentRead();
      break;

    case HostItemType.AppointmentCompose:
      item = getAppointmentCompose();
      break;

    case HostItemType.MeetingRequest:
      item = getMessageRead();
      break;

    default:
      return undefined;
  }

  addEventSupport(item);
  addSharedPropertiesSupport_addSharedPropertiesSupport(item);
  return item;
};
// CONCATENATED MODULE: ./src/utils/isOutlook16.ts
 /// <summary>
/// Determines whether Outlook client version is 16, or greater.
/// </summary>
/// <returns>true => Outlook client version is 16, or greater; false otherwise</returns>
/// <remarks>Exposed for unit tests.</remarks>

var isOutlook16_isOutlook16OrGreater = function isOutlook16OrGreater(hostVersion) {
  // Outlook host version number is of the format 16.0.YYYY.YYYY for Outlook16/2016.
  var endIndex = 0;
  var majorVersionNumber = 0;

  if (!isNullOrUndefined(hostVersion)) {
    // Since we want the major version number (which is 16 for Outlook16/2016),
    // we get the first index of the '.' character in the Outlook host version number.
    endIndex = hostVersion.indexOf("."); // Then we grab the major version number as the substring to the first index of the '.' character.

    majorVersionNumber = parseInt(hostVersion.substring(0, endIndex));
  }

  return majorVersionNumber >= 16;
};
// CONCATENATED MODULE: ./src/utils/isApiVersionSupported.ts
/// <summary>
/// Determines whether Outlook client supports api version
/// </summary>
/// <param name="requirementSet">api version to check</param>
/// <returns>true => Outlook client supports api version; false otherwise</returns>
/// <remarks>Exposed for unit tests.</remarks>
var isApiVersionSupported = function isApiVersionSupported(requirementSet, officeAppContext) {
  var apiSupported = false;

  try {
    var requirementDict = JSON.parse(officeAppContext.get_requirementMatrix());
    var hostApiVersion = requirementDict["Mailbox"];
    var hostApiVersionParts = hostApiVersion.split(".");
    var requirementSetParts = requirementSet.split(".");

    if (parseInt(hostApiVersionParts[0]) > parseInt(requirementSetParts[0]) || parseInt(hostApiVersionParts[0]) === parseInt(requirementSetParts[0]) && parseInt(hostApiVersionParts[1]) >= parseInt(requirementSetParts[1])) {
      apiSupported = true;
    }
  } catch (_a) {// Exception if officeAppContext is not loaded correctly.
  }

  return apiSupported;
};
// CONCATENATED MODULE: ./src/api/OutlookAppOm.ts








var OutlookAppOm_OSF = __webpack_require__(1); /// <reference types="../types/external" />


var appInstance;
var getInitialDataProp = function getInitialDataProp(key) {
  return appInstance && appInstance.getInitialDataProp(key);
};
var getAppName = function getAppName() {
  return appInstance && appInstance.getAppName();
};

var OutlookAppOm_OutlookAppOm =
/** @class */
function () {
  function OutlookAppOm(appContext, targetWindow, appReadyCallback) {
    var _this = this;

    this.displayName = "mailbox"; // initialze is separated from onInitialDataResponse, because it is called from the ItemSelectionChanged event
    // in the Base JS files

    this.initialize = function (data) {
      // For the Persistent Taskpane feature in Desktop Outlook,
      // Outlook can send a null item during an item change event.
      // This means that JavaScript eventing code can call this function with a null initialData.
      // So we have to propagate that information down to the appropriate objects, especially the item object.
      if (data === null) {
        recreateAdditionalGlobalParametersSingleton(true
        /*parameterBlobSupported*/
        );
        _this.initialData = null;
        _this.item = null;
      } else {
        _this.initialData = data;
        _this.initialData.permissionLevel = calculatePermissionLevel();
        _this.item = prepareApiSurface_getItem();
        var supportsAdditionalParameters = getAppName() !== OutlookAppOm_OSF.AppName.Outlook || isOutlook16_isOutlook16OrGreater(getInitialDataProp("hostVersion")) || isApiVersionSupported("1.5", _this.officeAppContext);
        recreateAdditionalGlobalParametersSingleton(supportsAdditionalParameters);

        if (typeof data.itemNumber !== "undefined") {
          getAdditionalGlobalParametersSingleton().setCurrentItemNumber(data.itemNumber);
        }
      }
    };

    this.onInitialDataResponse = function (resultCode, data) {
      // Outlook Desktop returns undefined from result code
      if (!!resultCode && resultCode !== InvokeResultCode.noError) {
        return;
      }

      _this.initialize(data);

      prepareApiSurface_createMailboxSurface(_this);
      setTimeout(function () {
        return _this.appReadyCallback();
      }, 0);
    };

    this.officeAppContext = appContext;
    this.targetWindow = window;
    this.appReadyCallback = appReadyCallback;
    appInstance = this;
    Object(ExtensibilityStrings["b" /* loadLocalizedScript */])(function () {
      if (!!appReadyCallback && !_this.officeAppContext.get_isDialog()) {
        standardInvokeHostMethod_invokeHostMethod(1
        /* getInitialData */
        , undefined, _this.onInitialDataResponse);
      }
    });
  }

  OutlookAppOm.prototype.getAppName = function () {
    return this.officeAppContext.get_appName();
  };

  OutlookAppOm.prototype.getInitialDataProp = function (key) {
    return this.initialData && this.initialData[key];
  }; // This is on OutlookAppOm for legacy reasons. The Base file calls into OutlookAppOm.setCurrentItemNumber.
  // we should consider rewriting the base files to call getAdditionalGlobalParametersSingleton directly


  OutlookAppOm.prototype.setCurrentItemNumber = function (newItemNumber) {
    getAdditionalGlobalParametersSingleton().setCurrentItemNumber(newItemNumber);
  };

  OutlookAppOm.addAdditionalArgs = function (dispid, hostCallingArgs) {
    return hostCallingArgs;
  };

  return OutlookAppOm;
}(); // END OF CLASS




var calculatePermissionLevel = function calculatePermissionLevel() {
  var HostReadItem = 1;
  var HostReadWriteMailbox = 2;
  var HostReadWriteItem = 3;
  var permissionLevelFromHost = getInitialDataProp("permissionLevel");

  if (permissionLevelFromHost === undefined) {
    return 0
    /* restricted */
    ;
  }

  switch (permissionLevelFromHost) {
    case HostReadItem:
      return 1
      /* readItem */
      ;

    case HostReadWriteItem:
      return 2
      /* readWriteItem */
      ;

    case HostReadWriteMailbox:
      return 3
      /* readWriteMailbox */
      ;

    default:
      return 0
      /* restricted */
      ;
  }
};
// CONCATENATED MODULE: ./src/methods/saveSettingsRequest.ts





var saveSettingsRequest_OSF = __webpack_require__(1); /// <summary>
/// Limit for the extension settings length (this is the per extension settings property) in number of characters.
/// Note this limit should be consistent with Outlook's implementation of Extensibility API.
/// Also this should be consistent with the limit enforced by ExtHostApiManager
/// </summary>


var settingsMaxNumberOfCharacters = 32 * 1024;
function saveSettingsRequest(data) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  var commonParameters = parseCommonArgs(args, false
  /* callbackRequired */
  , false
  /* tryLegacy */
  ); // check how big the payload is for settings and handle the response

  var serializedSettings = saveSettingsRequest_OSF.DDA.SettingsManager.serializeSettings(data);

  if (JSON.stringify(serializedSettings).length > settingsMaxNumberOfCharacters) {
    // Return the error message.
    var asyncResult_1 = createAsyncResult(undefined, saveSettingsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, 9019
    /* GenericSettingsError */
    , commonParameters.asyncContext, "" // Empty String
    );

    if (!!commonParameters.callback) {
      setTimeout(function () {
        if (!!commonParameters.callback) commonParameters.callback(asyncResult_1);
      }, 0);
    }

    return;
  }

  if (saveSettingsRequest_OSF.AppName.OutlookWebApp === getAppName()) {
    saveSettingsForOwa(commonParameters, serializedSettings);
  } else {
    saveSettingsForOutlookDesktop(commonParameters, serializedSettings);
  }
}

function saveSettingsForOwa(commonParameters, serializedSettings) {
  standardInvokeHostMethod(404
  /* saveSettingsRequest */
  , commonParameters.asyncContext, commonParameters.callback, [serializedSettings], undefined);
}

function saveSettingsForOutlookDesktop(commonParameters, serializedSettings) {
  // Get the startTime in milliseconds.
  // TODO: Telemetry VSO: 3625807
  // int startTime = (new DateTime()).GetTime();
  var detailedErrorCode = -1;
  var storedException = null;

  try {
    var jsonSettings = JSON.stringify(serializedSettings); // We use a single key-value to save to Outlook, see class remarks for the reason.

    var settingsObjectToSave = {};
    settingsObjectToSave.SettingsKey = jsonSettings;
    saveSettingsRequest_OSF.DDA.ClientSettingsManager.write(settingsObjectToSave);
  } catch (ex) {
    storedException = ex;
  }

  var asyncResult = undefined;

  if (storedException != null) {
    detailedErrorCode = 9019
    /* GenericSettingsError */
    ;
    asyncResult = createAsyncResult(undefined, saveSettingsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Failed, detailedErrorCode, commonParameters.asyncContext, storedException.Message);
  } else {
    detailedErrorCode = 0;
    asyncResult = createAsyncResult(undefined, saveSettingsRequest_OSF.DDA.AsyncResultEnum.ErrorCode.Success, detailedErrorCode, commonParameters.asyncContext);
  }
  /* TODO: Telemetry VSO: 3625807
  // Log the API call using OSF's telemetry mechanism.
  // This gets translated to OSF.AppTelemetry.onMethodDone(...args...);
  OSFCore.OSF.AppTelemetry.OnMethodDone(
      (int)OutlookDispid.SaveSettingsRequest,
      null,
      Math.Abs((new DateTime()).GetTime() - startTime),
      detailedErrorCode);
  */


  if (!!commonParameters.callback) {
    commonParameters.callback(asyncResult);
  }
}
// CONCATENATED MODULE: ./src/api/Settings.ts
var Settings_spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};




var Settings_OSF = __webpack_require__(1); /// <summary>
/// The Outlook Settings object model implementation.
/// </summary>
/// <remarks>This class includes special code for Outlook.  Outlook does not use the same format as other rich clients' settings (like Word or Excel)
/// because Outlook settings format needs to match OWA.
/// For OWA - the json string created from the settings dictionary is XDM'ed to OWA host. OWA host sends the json string to the server to save to user's inbox FAI.
/// For Outlook - the json string is added to a 1 entry dictionary: key="SettingsKey"; value=json string created from the settings dictionary.
/// OSF.DDA.ClientSettingsManager is then used to write the single entry dictionary to Outlook.  Outlook has the logic to take the json string save it
/// to user's inbox FAI.
/// When a setting is first read, the reverse is done to initialize the internal settings dictionary.
/// </remarks>


var Settings_Settings =
/** @class */
function () {
  function Settings(deserializedData) {
    this.rawData = deserializedData;
    this.settingsData = null;
  }

  Settings.prototype.getSettingsData = function () {
    if (this.settingsData == null) {
      this.settingsData = this.convertFromRawSettings(this.rawData);
      this.rawData = null;
    }

    return this.settingsData;
  };

  Settings.prototype.get = function (key) {
    return this.getSettingsData()[key];
  };

  Settings.prototype.set = function (key, value) {
    this.getSettingsData()[key] = value;
  };

  Settings.prototype.remove = function (key) {
    delete this.getSettingsData()[key];
  };

  Settings.prototype.saveAsync = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    saveSettingsRequest.apply(void 0, Settings_spreadArrays([this.getSettingsData()], args));
  };

  Settings.prototype.convertFromRawSettings = function (rawSettings) {
    if (rawSettings == null) {
      return {};
    }

    if (getAppName() !== Settings_OSF.AppName.OutlookWebApp) {
      // For Outlook, we need to get the value of 'SettingsKey' from dictionary.  See class remarks on the reasoning.
      var outlookSettings = rawSettings.SettingsKey;

      if (!!outlookSettings) {
        return Settings_OSF.DDA.SettingsManager.deserializeSettings(outlookSettings);
      }
    }

    return rawSettings;
  };

  return Settings;
}();


// CONCATENATED MODULE: ./src/api/Intellisense.ts
var Intellisense = {
  toItemRead: function toItemRead(item) {
    return item;
  },
  toItemCompose: function toItemCompose(item) {
    return item;
  },
  toMessage: function toMessage(item) {
    return item;
  },
  toMessageRead: function toMessageRead(item) {
    return item;
  },
  toMessageCompose: function toMessageCompose(item) {
    return item;
  },
  toMeetingRequest: function toMeetingRequest(item) {
    return item;
  },
  toAppointment: function toAppointment(item) {
    return item;
  },
  toAppointmentRead: function toAppointmentRead(item) {
    return item;
  },
  toAppointmentCompose: function toAppointmentCompose(item) {
    return item;
  }
};
// CONCATENATED MODULE: ./src/api/OutlookBase.ts

var OutlookBase = {
  SeriesTimeJsonConverter: function SeriesTimeJsonConverter(rawInput) {
    if (rawInput !== null && typeof rawInput === "object") {
      if (rawInput.seriesTimeJson !== null) {
        var seriesTime = new SeriesTime_SeriesTime();
        seriesTime.importFromSeriesTimeJsonObject(rawInput.seriesTimeJson);
        delete rawInput["seriesTimeJson"];
        rawInput.seriesTime = seriesTime;
      }
    }

    return rawInput;
  },
  CreateAttachmentDetails: function CreateAttachmentDetails(data) {
    return data;
  }
};
// CONCATENATED MODULE: ./src/index.tsx






OSF = typeof OSF === "object" ? OSF : {};
OSF.DDA = OSF.DDA || {};
OSF.DDA.Settings = Settings_Settings;
OSF = typeof OSF === "object" ? OSF : {};
OSF.DDA = OSF.DDA || {};
OSF.DDA.OutlookAppOm = OutlookAppOm_OutlookAppOm;
Office = typeof Office === "object" ? Office : {};
Office.cast = Office.cast || {};
Office.cast.item = Intellisense;
Microsoft.Office.WebExtension.MailboxEnums = MailboxEnums;
Microsoft.Office.WebExtension.CoercionType = CoercionType;
Microsoft.Office.WebExtension.SeriesTime = SeriesTime_SeriesTime;
Microsoft.Office.WebExtension.OutlookBase = OutlookBase;
/* harmony default export */ var src = __webpack_exports__["default"] = (OutlookAppOm_OutlookAppOm);

/***/ })
/******/ ])["default"];
//# sourceMappingURL=outlook.win32.js.map    
    OSF.DDA.ErrorCodeManager.initializeErrorMessages(Strings.OfficeOM);
    if (appContext.get_appName() == OSF.AppName.Outlook && OSF.DDA.RichApi && OSF.DDA.AsyncMethodNames.ExecuteRichApiRequestAsync)
    {
        OSF.DDA.DispIdHost.addAsyncMethods(OSF.DDA.RichApi, [OSF.DDA.AsyncMethodNames.ExecuteRichApiRequestAsync]);
        OSF.DDA.RichApi.richApiMessageManager = new OfficeExt.RichApiMessageManager();
    }
    if (appContext.get_appName() == OSF.AppName.OutlookWebApp || appContext.get_appName() == OSF.AppName.OutlookIOS || appContext.get_appName() == OSF.AppName.OutlookAndroid)
    {
        this._settings = this._initializeSettings(appContext, false);
    }
    else if (OSF._OfficeAppFactory.getHostInfo()["hostPlatform"] == "mac" && appContext.get_appName() == OSF.AppName.Outlook)
    {
        this._settings = this.initializeMacSettings(appContext, false);
    }
    else
    {
        this._settings = this._initializeSettings(false);
    }
    appContext.appOM = new OSF.DDA.OutlookAppOm(appContext, this._webAppState.wnd, appReady);

    if (appContext.get_appName() == OSF.AppName.Outlook || appContext.get_appName() == OSF.AppName.OutlookWebApp || appContext.get_appName() == OSF.AppName.OutlookIOS || appContext.get_appName() == OSF.AppName.OutlookAndroid)
    {
        // Add OSF's eventing mechanism.
        OSF.DDA.DispIdHost.addEventSupport(
            appContext.appOM,
            new OSF.EventDispatch(
                [
                    Microsoft.Office.WebExtension.EventType.ItemChanged,
                    Microsoft.Office.WebExtension.EventType.OfficeThemeChanged
                ]
            )
        );
    }
};