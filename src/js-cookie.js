/**
 * Encapsulates cookie management functions.
 * @namespace
 */
var Cookie = {

	/**
	 * Returns cookie's value by key parameter.
	 * @param {*} key A key by which value is returned.
	 * @returns {string} Value associated with key parameter.
	 *                   If such a cookie does not exist,
	 *                   then null is returned.
	 */
	get: function(key) {
		if (!document.cookie)
			return null;
		var keyValuePairs = document.cookie.split(/\s*;\s*/g);
		for (var i in keyValuePairs) {
			var pair = keyValuePairs[i].split("=");
			if (pair[0] === key)
				return pair[1];
		}
		return null;
	},

	/**
	 * Returns all cookies as plain object,
	 * where keys are object keys and values are corresponding
	 * keys values.
	 * @returns {object} All existing cookies. If cookie is empty,
	 *                   then empty object is returned.
	 */
	getAll: function() {
		if (!document.cookie)
			return {};
		var result = {};
		document.cookie.split(/\s*;\s*/g).forEach(function(v, i, a) {
			var pair = v.split("=");
			result[pair[0]] = pair[1];
		});
		return result;
	},

	/**
	 * Sets cookie's value specified by key.
	 * @param {string} key A key by which value is set.
	 * @param {string} value A value associated with key.
	 * @param {string} path Which paths can access cookie. By default is "/" (entire domain).
	 * @param {string} expires After which date cookie is removed. By default is "" (only session).
	 * @param {string} maxAge After which seconds cookie is removed. By default is "" (only session).
	 * @param {string} domain To which domain cookie should be applied. By default is "" (current).
	 * @param {boolean} secure True if cookie is secure. By default false.
	 * @param {boolean} samesite True if cookie is samesite. By default is false.
	 * @returns {string} An old value associated with {@link key key} parameter, otherwise returns null.
	 */
	set: function(key, value, path, expires, maxAge, domain, secure, samesite) {
		path = path || "/";
		expires = expires || "";
		maxAge = maxAge || "";
		domain = domain || "";
		secure = secure || false;
		samesite = samesite || false
		var oldValue = Cookie.get(key);
		var str = key + "=" + value + ";path=" + path + ";";
		if (expires)
			str += "expires=" + expires + ";";
		if(maxAge)
			str += "max-age=" + maxAge + ";";
		if(domain)
			str += "domain=" + domain + ";";
		if (secure)
			str += "secure;";
		if (samesite)
			str += "samesite;";
		document.cookie = str;
		return oldValue;
	},

	/**
	 * Sets multiple cookie's values.
	 * With this method only key-value pairs are set,
	 * additional info such as expires won't be set.
	 * @param {object} object Plain object where keys and values are
	 *                        corresponding cookie keys and values. 
	 */
	setAsMap: function(object) {
		for (var key in object)
			Cookie.set(key, object[key]);
	},

	/**
	 * Sets multiple cookie's values.
	 * Same as {@link setAsMap()}, except for argument is array,
	 * containing objects, which can contain additional information,
	 * which allow to set expires and other options per cookie item.
	 * @param {object[]} array Array, containing cookie plain object items.
	 */
	setAsArray: function(array) {
		for (var i in array) {
			var curObject = array[i];
			Cookie.set(
				curObject.key,
				curObject.value,
				curObject.path,
				curObject.expires,
				curObject.maxAge,
				curObject.domain,
				curObject.secure,
				curObject.samesite
			);
		}
	},

	/**
	 * Removes cookie by key.
	 * @param {string} key Key by which cookie value is removed.
	 * @returns {string} Previous value or null if there was not cookie associated with key,
	 */
	unset: function(key) {
		var zeroDate = new Date();
		zeroDate.setTime(0);
		var oldValue = Cookie.get(key);
		document.cookie = key + "=" + ";expires=" + zeroDate.toUTCString() + ";path=/";
		return oldValue;
	},

	/**
	 * Removes all cookies (if possible) from session.
	 */
	clear: function() {
		var cookies = Cookie.getAll();
		for (var key in cookies)
			Cookie.unset(key);
	},
}
