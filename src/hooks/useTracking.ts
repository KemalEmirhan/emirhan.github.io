import { useCallback } from 'react';
import { TrackingEventSchema, type TTrackingEvent } from '@/schemas';
import { isDev } from '@/config/env';

const useTracking = (action: string) => {
  const clickEvent = useCallback(
    (eventData?: Omit<TTrackingEvent, 'action'>) => {
      const eventDataWithDefaults = {
        action,
        category: eventData?.category || 'engagement',
        label: eventData?.label,
        value: eventData?.value,
      };

      const event = TrackingEventSchema.parse(eventDataWithDefaults);

      if (isDev) {
        console.group(`🎯 Tracking Event: ${event.action}`);
        console.log('📊 Event Data:', {
          action: event.action,
          category: event.category,
          label: event.label,
          value: event.value,
        });
      }

      if (typeof window === 'undefined' || !window.gtag) {
        if (isDev) {
          console.warn('⚠️  Tracking skipped: window or gtag not available');
          console.groupEnd();
        }
        return;
      }

      if (isDev) {
        console.log('✅ Sending to Google Analytics...');
      }

      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });

      if (isDev) {
        console.log('📤 Event sent successfully');
        console.groupEnd();
      }
    },
    [action]
  );

  return { clickEvent };
};

export default useTracking;
