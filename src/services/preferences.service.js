import preferenceModel from '../models/preference.model.js';

class preferencesService {
async  updateUnits(userId, units) {
  const data = {};
  if (units.temperature !== undefined) {
    const t = String(units.temperature).toLowerCase();
    data.tempUnit = (t === 'fahrenheit' || t === 'f' || t === 'f°') ? 'F' : 'C';
  }
  if (units.windSpeed !== undefined) {
    const w = String(units.windSpeed).toLowerCase();
    data.windUnit = w === 'mph' ? 'mph' : 'kmh';
  }
  if (Object.keys(data).length === 0) {
    // nothing to update — return existing pref
    return preferenceModel.findByUserId(userId);
  }
  return preferenceModel.upsert(userId, data);
}


async  updateNotifications(userId, notifications) {
  const data = {};
  if (notifications.notifyChannel !== undefined) {
    const c = String(notifications.notifyChannel).toLowerCase();
    data.notifyChannel = c === 'sms' ? 'sms' : 'email';
  }
  if (Object.keys(data).length === 0) {
    return preferenceModel.findByUserId(userId);
  }
  return preferenceModel.upsert(userId, data);
}
}
export default new preferencesService ();