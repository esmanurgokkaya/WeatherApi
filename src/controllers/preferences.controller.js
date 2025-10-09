import zodValidation from '../utils/zod.schemas.js';
import preferencesService from '../services/preferences.service.js';
import { success } from '../utils/api.response.js';

class PreferencesController {
  async putUnits(req, res, next) {
    try {
      const userId = req.user?.id ?? req.user?.userId ?? req.user?.sub;
      if (!userId) return res.status(401).json({ error: 'Unauthorized - missing user id' });

      const parsed = zodValidation.unitsPreferencesSchema.parse(req.body);
      const updated = await preferencesService.updateUnits(userId, parsed);
      res.status(200).json(success("Units preferences updated successfully", updated));
    } catch (err) { next(err); }
  }

  async putNotifications(req, res, next) {
    try {
      const userId = req.user?.id ?? req.user?.userId ?? req.user?.sub;
      if (!userId) return res.status(401).json({ error: 'Unauthorized - missing user id' });
      const parsed = zodValidation.notificationsPreferencesSchema.parse(req.body);
      const updated = await preferencesService.updateNotifications(userId, parsed);
      res.status(200).json(success("Notifications preferences updated successfully", updated));
    } catch (err) { next(err); }
  }
}

export default new PreferencesController();