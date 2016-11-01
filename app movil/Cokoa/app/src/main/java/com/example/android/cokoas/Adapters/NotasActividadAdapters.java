package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Models.NotaActividad;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 10/06/2016.
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
        public TextView tituloActividad, descActividad, notaActividad,descripcionLogro;
        NotaActividad notaActividadss;

        public ViewHolder(View itemView) {
            super(itemView);
            tituloActividad = (TextView) itemView.findViewById(R.id.text_titulo_actividad);
            descActividad = (TextView) itemView.findViewById(R.id.text_des_actividad);
            notaActividad = (TextView) itemView.findViewById(R.id.text_nota_actividad);
            descripcionLogro = (TextView) activity.findViewById(R.id.txtActividadLogro);

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

        //Comprobamos si notaActividad es vacia
        if (TextUtils.isEmpty(notaActividads.get(position).getNotaActividad())) {
            viewHolder.notaActividad.setText("---");
        } else {
            viewHolder.notaActividad.setText(notaActividads.get(position).getNotaActividad());
        }

        viewHolder.notaActividadss = notaActividads.get(position);

        viewHolder.descripcionLogro.setText(notaActividads.get(position).getDescripcionLogro());
    }

    @Override
    public int getItemCount() {
        return notaActividads.size();
    }


}
