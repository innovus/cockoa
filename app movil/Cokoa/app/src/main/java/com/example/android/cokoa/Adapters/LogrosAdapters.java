package com.example.android.cokoa.Adapters;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoa.Asyntask.NotasActividadAsyntask;
import com.example.android.cokoa.Models.Logro;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 09/06/2016.
 */
public class LogrosAdapters extends RecyclerView.Adapter<LogrosAdapters.ViewHolder> {
    private ArrayList<Logro> logros;
    private static Activity activity;

    public LogrosAdapters(ArrayList<Logro> logros, Activity activity) {
        super();
        this.logros = logros;
        this.activity = activity;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tituloLogro, descLogro;
        Logro logro;

        public ViewHolder(View itemView) {
            super(itemView);
            tituloLogro = (TextView) itemView.findViewById(R.id.text_titulo_logro);
            descLogro = (TextView) itemView.findViewById(R.id.text_des_logro);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    NotasActividadAsyntask notasActividadAsyntask = new NotasActividadAsyntask(activity);
                    notasActividadAsyntask.execute(logro.getId_materia(), logro.getId_logro());
                }
            });


        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_logros, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        viewHolder.tituloLogro.setText(logros.get(position).getTitulo_logro());
        viewHolder.descLogro.setText(logros.get(position).getDesc_logro());
        //viewHolder.feed = materia.get(position);
        viewHolder.logro = logros.get(position);
    }

    @Override
    public int getItemCount() {
        return logros.size();
    }


}
