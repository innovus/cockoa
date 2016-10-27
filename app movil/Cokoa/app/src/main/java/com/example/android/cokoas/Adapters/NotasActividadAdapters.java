package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Models.NotaActividad;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 10/06/2016.
 */
public class NotasActividadAdapters extends RecyclerView.Adapter<NotasActividadAdapters.ViewHolder> {
    private ArrayList<NotaActividad> notaActividads;
    private static Activity activity;

    public NotasActividadAdapters(ArrayList<NotaActividad> notaActividads, Activity activity) {
        super();
        this.notaActividads = notaActividads;
        this.activity = activity;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tituloActividad, descActividad, notaActividad;

        public ViewHolder(View itemView) {
            super(itemView);
            tituloActividad = (TextView) itemView.findViewById(R.id.text_titulo_actividad);
            descActividad = (TextView) itemView.findViewById(R.id.text_des_actividad);
            notaActividad = (TextView) itemView.findViewById(R.id.text_nota_actividad);
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_nota_actividad, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.tituloActividad.setText(notaActividads.get(position).getNombreActividad());
        viewHolder.descActividad.setText(notaActividads.get(position).getDescActividad());
        viewHolder.notaActividad.setText(notaActividads.get(position).getNotaActividad());

    }

    @Override
    public int getItemCount() {
        return notaActividads.size();
    }


}
