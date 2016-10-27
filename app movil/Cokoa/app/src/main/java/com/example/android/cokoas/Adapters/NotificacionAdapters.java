package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

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
        viewHolder.tituloNotificacion.setText(notificacions.get(position).getTipoNotificacion());
        viewHolder.mensajeNotificacion.setText(notificacions.get(position).getMensajeNotificacion());
        viewHolder.fechaNotificacion.setText(notificacions.get(position).getFechaNotificacion());
    }

    @Override
    public int getItemCount() {
        return notificacions.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tituloNotificacion, mensajeNotificacion, fechaNotificacion;

        public ViewHolder(View itemView) {
            super(itemView);
            tituloNotificacion = (TextView) itemView.findViewById(R.id.txtTituloNotificacion);
            mensajeNotificacion = (TextView) itemView.findViewById(R.id.txtMensajeNotificacion);
            fechaNotificacion = (TextView) itemView.findViewById(R.id.txtFechaNotificacion);

        }


    }
}
