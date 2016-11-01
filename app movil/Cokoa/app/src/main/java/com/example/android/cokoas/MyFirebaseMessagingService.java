package com.example.android.cokoas;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

/**
 * Created by ASUS on 29/09/2016.
 */
public class MyFirebaseMessagingService extends FirebaseMessagingService {

    public static final String TAG = "NOTICIAS";
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Log.d("FIREBASE", remoteMessage.getNotification().getBody());


            if (remoteMessage.getNotification() != null) {
                Log.d("FIREBASE", remoteMessage.getNotification().getBody());
                String guia = remoteMessage.getData().get("guia");
                String tipo= remoteMessage.getData().get("tipo");
                String click_action=remoteMessage.getNotification().getClickAction();
                //int  smalIcon = R.drawable.ic_stat_name;
                mostrarNotificacion(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody(),guia,tipo,click_action);




                Map<String, String> data = remoteMessage.getData();
                if (data.containsKey("click_action")) {
                    ClickActionHelper.startActivity(data.get("click_action"), null, this);
                }
            }
    }

    public void mostrarNotificacion(String title, String body,String guia,String tipo,String click_action) {

        Intent intent;

        if(tipo.equals("2")){
            intent = new Intent(click_action);
            intent.putExtra("id_materia",guia);
            intent.putExtra("notificacion","True");

        }else {
            intent = new Intent(click_action);
             intent.putExtra("id_materia",guia);
            intent.putExtra("notificacion","True");
        }




       // int icon = Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP ? R.drawable.ic_book_black_24dp: R.mipmap.ic_launcher;
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
       // Uri sonud = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        // .setSmallIcon(R.drawable.ic_alarm_black_24dp)
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.ic_border_color_white_24dp)
                .setContentTitle(title)
                .setContentText(body)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);


        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, builder.build());
    }




    public static class ClickActionHelper {
        public static void startActivity(String className, Bundle extras, Context context){
            Class cls = null;
            try {
                cls = Class.forName(className);
            }catch(ClassNotFoundException e){
                //means you made a wrong input in firebase console
            }
            Intent i = new Intent(context, cls);
            i.putExtras(extras);
            context.startActivity(i);
        }
    }




}
