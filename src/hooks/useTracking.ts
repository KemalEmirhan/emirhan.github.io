import { useCallback } from 'react';
import { TrackingEventSchema, type TTrackingEvent } from '@/schemas';

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

      // Debug logging for development
      console.group(`🎯 Tracking Event: ${event.action}`);
      console.log('📊 Event Data:', {
        action: event.action,
        category: event.category,
        label: event.label,
        value: event.value,
      });

      if (typeof window === 'undefined' || !window.gtag) {
        console.warn('⚠️  Tracking skipped: window or gtag not available');
        console.groupEnd();
        return;
      }

      console.log('✅ Sending to Google Analytics...');
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
      console.log('📤 Event sent successfully');
      console.groupEnd();
    },
    [action]
  );

  return { clickEvent };
};

export default useTracking;
