import { Injectable } from '@angular/core'
import { Notification } from '@lib/definitions/notification.definition'
import { Observable, Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	private notificationsSubject = new Subject<Notification>()

	constructor() {}

	showNotification(notification: Notification): void {
		this.notificationsSubject.next(notification)
	}

	getNotifications(): Observable<Notification> {
		return this.notificationsSubject.asObservable()
	}
}
