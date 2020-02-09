/*
 * Copyright 2000-2020 Sergio Rando <segio.rando@yahoo.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// Init LocalStorage

/** @type {Storage | boolean} */
let STORAGE = false;

try {
	let unique = new Date().toString();
	(STORAGE = platform.localStorage).setItem(unique, unique);
	let fail = STORAGE.getItem(unique) != unique;
	STORAGE.removeItem(unique);
	fail && (STORAGE = false);
} catch (exception) {}

class cConfig {
	/**
	 * @param {Object<string,*>=} config 
	 */
	constructor(config) {
		/** @type {Object<string,*>} */ this.dictValues = config || {};
	}

	/**
	 * Is Config contains sKey value
	 * @param {string} sKey
	 * @returns {boolean}
	 */
	has(sKey) {
		return this.dictValues[sKey] !== undefined;
	}

	/**
	 * Get Config sKey value
	 * @param {string} sKey
	 * @returns {*}
	 */
	get(sKey) {
		return this.dictValues[sKey];
	}

	/**
	 * Set Config sKey value
	 * @param {string} sKey
	 * @param {*} oValue
	 */
	set(sKey, oValue) {
		this.dictValues[sKey] = oValue;
	}

	/**
	 * Store Config sKey value on LocalStorage
	 * @param {string} sKey
	 */
	store(sKey) {
		if (sKey == 'store' || sKey == 'restore')
			throw new TypeError(sKey + ' reserved');
		STORAGE[sKey] = JSON.stringify(this.dictValues[sKey]);
	}

	/**
	 * Restore Config sKey value from LocalStorage
	 * @param {string} sKey
	 */
	restore(sKey) {
		if (sKey == 'store' || sKey == 'restore')
			throw new TypeError(sKey + ' reserved');

		if (STORAGE[sKey] !== undefined) {
			if (this.dictValues[sKey] === undefined)
				this.dictValues[sKey] = {};
			platform.inject(this.dictValues[sKey], JSON.parse(STORAGE[sKey]));
		}
	}
}

export const Config = new cConfig();
