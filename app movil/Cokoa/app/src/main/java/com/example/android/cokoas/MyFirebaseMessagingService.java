package com.example.android.cokoas;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.example.android.cokoas.Activities.InasistenciaMateriaActivity;
import com.example.android.cokoas.Activities.NotasActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

/**
 * Created by ASUS on 29/09/2016.
 */
public class MyFirebaseMessagingService extends FirebaseMessagingService {

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    public static final String TAG = "NOTICIAS";
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d("FIREBASE", remoteMessage.getNotification().getBody());


            if (remoteMessage.getNotification() != null) {
                Log.d("FIREBASE", remoteMessage.getNotification().getBody());
                String guia = remoteMessage.getData().get("guia");
                String tipo= remoteMessage.getData().get("tipo");
                mostrarNotificacion(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody(),guia,tipo);
            }
    }

    public void mostrarNotificacion(String title, String body,String guia,String tipo) {

        Intent intent;

        if(tipo.equals("2")){
            intent = new Intent(this, NotasActivity.class);
            intent.putExtra("id_materia",guia);
            intent.putExtra("id_logro","50042");
            intent.putExtra("descripcionLogro","Calificacion actividad");

        }else {
            intent = new Intent(this, InasistenciaMateriaActivity.class);
             intent.putExtra("id_materia",guia);
            /*intent.putExtra("id_logro","50042");
            intent.putExtra("descripcionLogro","Calificacion actividad");*/

        }



        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
        Uri sonud = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        // .setSmallIcon(R.drawable.ic_alarm_black_24dp)
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, builder.build());
    }


}
