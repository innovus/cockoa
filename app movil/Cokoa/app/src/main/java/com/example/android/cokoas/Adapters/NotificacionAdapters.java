package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.android.cokoas.Activities.InasistenciaMateriaActivity;
import com.example.android.cokoas.Activities.NotasActivity;
import com.example.android.cokoas.Asyntask.NotificacionEstadoAsyntask;
import com.example.android.cokoas.Models.Notificacion;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 8/09/2016.
 */
public class NotificacionAdapters extends RecyclerView.Adapter<NotificacionAdapters.ViewHolder> {
    private ArrayList<Notificacion> notificacions;
    private static Activity activity;

    public NotificacionAdapters(ArrayList<Notificacion> notificacions, Activity activity) {
        super();
        this.notificacions = notificacions;
        this.activity = activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_notificacion, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {

        if(notificacions.get(position).getTipoNotificacion().equals("1")){
            viewHolder.tituloNotificacion.setText("Inasistencia");
            viewHolder.imgNotificacion.setImageResource(R.drawable.ic_alarm_black_24dp);
        }else{
            viewHolder.tituloNotificacion.setText("Nota Actividad");
            viewHolder.imgNotificacion.setImageResource(R.drawable.ic_book_black_24dp);
        }

        viewHolder.mensajeNotificacion.setText(notificacions.get(position).getMensajeNotificacion());
        viewHolder.fechaNotificacion.setText(notificacions.get(position).getFechaNotificacion());

        if(notificacions.get(position).getEstadoNotificaion().equals("1")){
            viewHolder.cardViewNotificacion.setCardBackgroundColor(Color.WHITE);
        }



        viewHolder.notificacion = notificacions.get(position);
    }

    @Override
    public int getItemCount() {
        return notificacions.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tituloNotificacion, mensajeNotificacion, fechaNotificacion;
        public CardView cardViewNotificacion;
        public ImageView imgNotificacion;
        Notificacion notificacion;

        public ViewHolder(View itemView) {
            super(itemView);
            tituloNotificacion = (TextView) itemView.findViewById(R.id.txtTituloNotificacion);
            mensajeNotificacion = (TextView) itemView.findViewById(R.id.txtMensajeNotificacion);
            fechaNotificacion = (TextView) itemView.findViewById(R.id.txtFechaNotificacion);
            imgNotificacion = (ImageView) itemView.findViewById(R.id.imgNotificacion);
            cardViewNotificacion = (CardView) itemView.findViewById(R.id.card_view_notificacaion);



            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    new NotificacionEstadoAsyntask(activity).execute(notificacion.getIdNotificacion());

                    if(notificacion.getTipoNotificacion().equals("2")){
                        Intent intent = new Intent(activity, NotasActivity.class);
                        intent.putExtra("id_materia",notificacion.getGuia());
                        intent.putExtra("notificacion","True");
                        activity.startActivity(intent);
                    }else{
                        Intent intent = new Intent(activity, InasistenciaMateriaActivity.class);
                        intent.putExtra("id_materia",notificacion.getGuia());
                        intent.putExtra("notificacion","True");
                        activity.startActivity(intent);
                    }

                }
            });






        }


    }
}
