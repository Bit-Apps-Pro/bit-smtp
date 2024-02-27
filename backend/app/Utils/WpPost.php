<?php

namespace BitApps\BMI\Utils;

trait WpPost
{
    public function getPosts($filter)
    {
        $filter['numberposts'] = -1;
        $posts                 = get_posts($filter);

        return array_map(function ($post) {
            return [
                'id'   => $post->ID,
                'name' => $post->post_title,

            ];
        }, $posts);
    }

    public function getTerms($data)
    {
        $options = [
            'hide_empty' => false,
            'orderby'    => 'id',
            'order'      => 'DESC'
        ];
        $options = array_merge($options, $data);
        $terms   = get_terms($options);

        return array_map(function ($term) {
            return [
                'id'   => $term->term_id,
                'name' => $term->name,
            ];
        }, $terms);
    }
}
